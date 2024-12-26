import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { db } from '@/firebaseConfig'
import { doc, runTransaction, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    const userRef = doc(db, 'users', userId)
    
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef)
      if (!userDoc.exists()) {
        throw new Error('User not found')
      }

      // Find the latest active subscription in the payments collection
      const paymentsQuery = query(
        collection(db, 'payments'),
        where('userId', '==', userId),
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc'),
        limit(1)
      )
      const paymentsSnapshot = await getDocs(paymentsQuery)

      if (paymentsSnapshot.empty) {
        throw new Error('No active subscription found')
      }

      const paymentDoc = paymentsSnapshot.docs[0]
      const paymentData = paymentDoc.data()
      const subscriptionId = paymentData.subscriptionId

      if (!subscriptionId) {
        throw new Error('No active subscription ID found')
      }

      // Cancel the subscription in Stripe
      const canceledSubscription = await stripe.subscriptions.cancel(subscriptionId)

      // Update user document in Firestore
      transaction.update(userRef, {
        'subscription.plan': 'free',
        'subscription.status': 'canceled',
        'subscription.id': null,
        credits: 20,
      })

      // Update the payment document
      transaction.update(doc(db, 'payments', paymentDoc.id), {
        status: 'canceled',
        canceledAt: new Date(),
        endDate: new Date(canceledSubscription.current_period_end * 1000),
        updatedAt: new Date(),
      })
    })

    res.status(200).json({ message: 'Subscription cancelled successfully' })
  } catch (error: any) {
    console.error('Error cancelling subscription:', error)
    res.status(500).json({ error: error.message || 'An unexpected error occurred' })
  }
}

