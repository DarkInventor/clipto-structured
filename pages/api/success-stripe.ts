// import type { NextApiRequest, NextApiResponse } from 'next'
// import Stripe from 'stripe'
// import { db } from '@/firebaseConfig'
// import { collection, addDoc, Timestamp, doc, runTransaction } from 'firebase/firestore'

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2024-12-18.acacia',
// })

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method not allowed' })
//   }

//   const { session_id, userId } = req.query

//   if (!session_id || typeof session_id !== 'string' || !userId || typeof userId !== 'string') {
//     console.error('Missing session_id or userId')
//     return res.status(400).json({ error: 'Missing session_id or userId' })
//   }

//   try {
//     // Retrieve the session data from Stripe
//     const session = await stripe.checkout.sessions.retrieve(session_id, {
//       expand: ['customer', 'line_items', 'subscription'],
//     })

//     // Extract relevant information
//     const customer = session.customer as Stripe.Customer
//     const subscription = session.subscription as Stripe.Subscription
//     const lineItem = session.line_items?.data[0]
//     const price = lineItem?.price

//     // Prepare the payment data
//     const paymentData = {
//       userId: userId,
//       customerId: customer.id,
//       customerEmail: customer.email,
//       customerName: customer.name,
//       subscriptionId: subscription.id,
//       planId: price?.id || 'Unknown',
//       planName: price?.nickname || 'Unknown Plan',
//       // Convert amount from cents to dollars (Stripe uses smallest currency unit)
//     //   @ts-ignore
//       amount: session.amount_total / 100, // Convert cents to dollars
//       currency: session.currency,
//       status: subscription.status,
//       interval: price?.recurring?.interval || 'unknown',
//       intervalCount: price?.recurring?.interval_count || 1,
//       startDate: Timestamp.fromMillis(subscription.current_period_start * 1000),
//       endDate: Timestamp.fromMillis(subscription.current_period_end * 1000),
//       createdAt: Timestamp.now(),
//     }

//     // Determine credits and plan based on plan name
//     let credits = 0
//     let plan = 'free'
//     const planName = paymentData.planName.toLowerCase()
//     if (planName.includes('hobby')) {
//       credits = 500
//       plan = 'hobby'
//     } else if (planName.includes('creator')) {
//       credits = 1000
//       plan = 'creator'
//     } else if (planName.includes('pro')) {
//       credits = 4000
//       plan = 'pro'
//     }

//     // Use a transaction to update both payments and users collections
//     await runTransaction(db, async (transaction) => {
//       // Add the payment data to Firestore
//       const paymentDocRef = doc(collection(db, 'payments'))
//       transaction.set(paymentDocRef, paymentData)

//       // Update the user's subscription plan and credits
//       const userDocRef = doc(db, 'users', userId)
//       transaction.update(userDocRef, {
//         subscription: {
//           plan: plan
//         },
//         credits: credits,
//         lastUpdated: Timestamp.now()
//       })

//       console.log('Payment data added and user updated. Payment ID:', paymentDocRef.id)
//     })

//     // Redirect to /mockup-home
//     res.redirect(307, '/mockup-home')
//   } catch (error) {
//     console.error('Error processing payment:', error)
//     res.status(500).json({ error: 'Error processing payment' })
//   }
// }








import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { db } from '@/firebaseConfig'
import { collection, addDoc, Timestamp, doc, runTransaction, query, where, getDocs } from 'firebase/firestore'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { session_id, userId } = req.query

    if (!session_id || typeof session_id !== 'string' || !userId || typeof userId !== 'string') {
      console.error('Missing session_id or userId')
      return res.status(400).json({ error: 'Missing session_id or userId' })
    }

    try {
      const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['customer', 'line_items', 'subscription'],
      })

      const customer = session.customer as Stripe.Customer
      const subscription = session.subscription as Stripe.Subscription
      const lineItem = session.line_items?.data[0]
      const price = lineItem?.price

      const paymentData = {
        userId: userId,
        customerId: customer.id,
        customerEmail: customer.email,
        customerName: customer.name,
        subscriptionId: subscription.id,
        planId: price?.id || 'Unknown',
        planName: price?.nickname || 'Unknown Plan',
        amount: (session.amount_total || 0) / 100,
        currency: session.currency,
        status: subscription.status,
        interval: price?.recurring?.interval || 'unknown',
        intervalCount: price?.recurring?.interval_count || 1,
        startDate: Timestamp.fromMillis(subscription.current_period_start * 1000),
        endDate: Timestamp.fromMillis(subscription.current_period_end * 1000),
        createdAt: Timestamp.now(),
      }

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

      await runTransaction(db, async (transaction) => {
        const paymentDocRef = doc(collection(db, 'payments'))
        transaction.set(paymentDocRef, paymentData)

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

      res.redirect(307, '/mockup-home')
    } catch (error) {
      console.error('Error processing payment:', error)
      res.status(500).json({ error: 'Error processing payment' })
    }
  } else if (req.method === 'POST') {
    const rawBody = await getRawBody(req)
    const sig = req.headers['stripe-signature'] as string

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (err: any) {
      console.error(`Webhook Error: ${err.message}`)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    if (event.type === 'invoice.paid') {
      const invoice = event.data.object as Stripe.Invoice
      const subscriptionId = invoice.subscription as string

      try {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId)
        const userId = subscription.metadata.userId

        if (!userId) {
          throw new Error('User ID not found in subscription metadata')
        }

        // Check if this invoice has already been processed
        const paymentsQuery = query(collection(db, 'payments'), where('invoiceId', '==', invoice.id))
        const paymentsSnapshot = await getDocs(paymentsQuery)
        
        if (!paymentsSnapshot.empty) {
          console.log(`Invoice ${invoice.id} has already been processed`)
          return res.status(200).json({ received: true })
        }

        let credits = 0
        let plan = 'free'
        const planName = subscription.items.data[0]?.price.nickname?.toLowerCase() || ''
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

        await runTransaction(db, async (transaction) => {
          const userDocRef = doc(db, 'users', userId)
          const userDoc = await transaction.get(userDocRef)

          if (!userDoc.exists()) {
            throw new Error(`User ${userId} not found`)
          }

          const userData = userDoc.data()
          const newCredits = (userData.credits || 0) + credits

          transaction.update(userDocRef, {
            credits: newCredits,
            subscription: {
              plan: plan,
              status: subscription.status,
              currentPeriodEnd: new Date(subscription.current_period_end * 1000)
            },
            lastUpdated: Timestamp.now()
          })

          // Add payment record
          const paymentDocRef = doc(collection(db, 'payments'))
          transaction.set(paymentDocRef, {
            userId: userId,
            invoiceId: invoice.id,
            amount: invoice.amount_paid / 100,
            currency: invoice.currency,
            status: invoice.status,
            date: new Date(invoice.created * 1000),
            planName: planName,
            creditsAdded: credits
          })
        })

        console.log(`Updated credits for user ${userId}. New total: ${credits}`)
        return res.status(200).json({ received: true })
      } catch (error) {
        console.error('Error processing invoice.paid event:', error)
        return res.status(500).json({ error: 'Error processing invoice.paid event' })
      }
    }

    res.status(200).json({ received: true })
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end('Method Not Allowed')
  }
}

// Helper function to get raw body
async function getRawBody(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    })
    req.on('end', () => {
      resolve(Buffer.from(body))
    })
    req.on('error', reject)
  })
}

