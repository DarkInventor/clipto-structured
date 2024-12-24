import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { db } from '@/firebaseConfig'
import { collection, addDoc, Timestamp, doc, runTransaction } from 'firebase/firestore'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { session_id, userId } = req.query

  if (!session_id || typeof session_id !== 'string' || !userId || typeof userId !== 'string') {
    console.error('Missing session_id or userId')
    return res.status(400).json({ error: 'Missing session_id or userId' })
  }

  try {
    // Retrieve the session data from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['customer', 'line_items', 'subscription'],
    })

    // Extract relevant information
    const customer = session.customer as Stripe.Customer
    const subscription = session.subscription as Stripe.Subscription
    const lineItem = session.line_items?.data[0]
    const price = lineItem?.price

    // Prepare the payment data
    const paymentData = {
      userId: userId,
      customerId: customer.id,
      customerEmail: customer.email,
      customerName: customer.name,
      subscriptionId: subscription.id,
      planId: price?.id || 'Unknown',
      planName: price?.nickname || 'Unknown Plan',
      // Convert amount from cents to dollars (Stripe uses smallest currency unit)
    //   @ts-ignore
      amount: session.amount_total / 100, // Convert cents to dollars
      currency: session.currency,
      status: subscription.status,
      interval: price?.recurring?.interval || 'unknown',
      intervalCount: price?.recurring?.interval_count || 1,
      startDate: Timestamp.fromMillis(subscription.current_period_start * 1000),
      endDate: Timestamp.fromMillis(subscription.current_period_end * 1000),
      createdAt: Timestamp.now(),
    }

    // Determine credits and plan based on plan name
    let credits = 0
    let plan = 'free'
    const planName = paymentData.planName.toLowerCase()
    if (planName.includes('hobby')) {
      credits = 500
      plan = 'hobby'
    } else if (planName.includes('creator')) {
      credits = 1000
      plan = 'creator'
    } else if (planName.includes('pro')) {
      credits = 4000
      plan = 'pro'
    }

    // Use a transaction to update both payments and users collections
    await runTransaction(db, async (transaction) => {
      // Add the payment data to Firestore
      const paymentDocRef = doc(collection(db, 'payments'))
      transaction.set(paymentDocRef, paymentData)

      // Update the user's subscription plan and credits
      const userDocRef = doc(db, 'users', userId)
      transaction.update(userDocRef, {
        subscription: {
          plan: plan
        },
        credits: credits,
        lastUpdated: Timestamp.now()
      })

      console.log('Payment data added and user updated. Payment ID:', paymentDocRef.id)
    })

    // Redirect to /mockup-home
    res.redirect(307, '/mockup-home')
  } catch (error) {
    console.error('Error processing payment:', error)
    res.status(500).json({ error: 'Error processing payment' })
  }
}

