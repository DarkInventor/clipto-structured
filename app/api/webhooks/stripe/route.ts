// import { NextResponse } from 'next/server'
// import Stripe from 'stripe'
// import { db } from '@/firebaseConfig'
// import { collection, addDoc } from 'firebase/firestore'

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2024-12-18.acacia',
// })

// export async function POST(req: Request) {
//   const body = await req.text()
//   const signature = req.headers.get('stripe-signature')!

//   let event: Stripe.Event

//   try {
//     event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
//   } catch (err: any) {
//     return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
//   }

//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object as Stripe.Checkout.Session

//     try {
//         console.log('Retrieving subscription details...')
      

//       // Retrieve the subscription details
//       const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

//       console.log('Subscription details retrieved:', subscription.id)
//       // Retrieve the customer details
//       const customer = await stripe.customers.retrieve(session.customer as string)
//       console.log('Retrieving customer details...')

//       // Prepare the payment data
//       const paymentData = {
//         userId: session.client_reference_id,
//         customerId: session.customer,
//         subscriptionId: session.subscription,
//         plan: subscription.items.data[0].price.nickname,
//         planId: subscription.items.data[0].price.id,
//         amount: session.amount_total,
//         currency: session.currency,
//         status: subscription.status,
//         interval: subscription.items.data[0].plan.interval,
//         intervalCount: subscription.items.data[0].plan.interval_count,
//         startDate: new Date(subscription.current_period_start * 1000),
//         endDate: new Date(subscription.current_period_end * 1000),
//         customerName: customer.name,
//         customerEmail: customer.email,
//         paymentMethod: session.payment_method_types[0],
//         createdAt: new Date(),
//       }
//       console.log('Preparing to add payment data to Firestore...')
//       // Add the payment data to Firestore
//       await addDoc(collection(db, 'payments'), paymentData)
//       console.log('Payment data added to Firestore with ID:', docRef.id)

//       console.log('Payment data added to Firestore')
//     } catch (error) {
//       console.error('Error processing payment:', error)
//       return NextResponse.json({ error: 'Error processing payment' }, { status: 500 })
//     }
//   }

//   return NextResponse.json({ received: true })
// }

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url)
//   const sessionId = searchParams.get('session_id')

//   if (!sessionId) {
//     return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
//   }

//   try {
//     const session = await stripe.checkout.sessions.retrieve(sessionId)
//     return NextResponse.json({ session })
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 })
//   }
// }

// export async function PUT(req: Request) {
//   const { priceId, isAnnual, userId } = await req.json()

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price: priceId,
//           quantity: 1,
//         },
//       ],
//       mode: 'subscription',
//       success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/success-stripe?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
//       client_reference_id: userId,
//     })

//     return NextResponse.json({ sessionId: session.id })
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 })
//   }
// }




import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export async function PUT(req: Request) {
  const { priceId, isAnnual, userId } = await req.json()

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/success-stripe?session_id={CHECKOUT_SESSION_ID}&userId=${userId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      client_reference_id: userId,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

