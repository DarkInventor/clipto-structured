// import { NextResponse } from 'next/server'
// import Stripe from 'stripe'

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2024-12-18.acacia',
// })

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
//       success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/success-stripe?session_id={CHECKOUT_SESSION_ID}&userId=${userId}`,
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
      subscription_data: {
        metadata: {
          userId: userId,
        },
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (err: any) {
    console.error('Error creating Stripe session:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

