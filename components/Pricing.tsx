// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Button } from "@/components/ui/button"
// import { Switch } from "@/components/ui/switch"
// import { Check } from 'lucide-react'
// import MinimalCreditCalculator from './credit-calculator'

// export default function PricingComponent() {
//   const [isAnnual, setIsAnnual] = useState(false)
//   const router = useRouter()

//   const plans = [
//     {
//       name: 'Free',
//       description: 'Get started with basic features',
//       price: isAnnual ? 0 : 0,
//       features: [
//         '20 credits',
//       ],
//     },
//     {
//       name: 'Hobby',
//       description: 'Perfect to get started',
//       price: isAnnual ? 14 : 19,
//       features: [
//         '500 credits',
//         'Priority support',
//         'Access to all future updates',
//       ],
//     },
//     {
//       name: 'Creator',
//       description: 'For creators looking to build a following',
//       price: isAnnual ? 28 : 39,
//       features: [
//         '1,000 credits',
//         '24/7 dedicated support',
//         'Unlimited projects',
//         'Access to all future updates'
//       ],
//       highlighted: true,
//     },
//     {
//       name: 'Pro Plan',
//       description: 'For those who need videos at scale',
//       price: isAnnual ? 62 : 89,
//       features: [
//         '4,000 Credits',
//         '24/7 dedicated support',
//         'Unlimited projects',
//         'Early Access to all future updates',
//       ],
//     },
//   ]

//   const handleSubscribe = (planName: string) => {
//     if (planName === 'Free') {
//       router.push('/mockup-home')
//     }
//     // For other plans, the click handler is empty as requested
//   }

//   return (
//     <>
//       <section className="bg-black pt-28 text-white pb-0 lg:pb-20 md:pb-20" id="pricing">
//         <div className="container mx-auto px-4">
//           <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-[#86868b]">Pricing</h2>
//           <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[#c8c2bd] mt-6 mx-auto text-center">Simple pricing for everyone.</h1>
//           <p className="mx-auto mt-6 max-w-2xl text-center lg:text-xl text-[#86868b] text-[1em]">
//             Choose a flexible credit plan that renews monthly.
//           </p>

//           <div className="mt-12 flex items-center justify-center space-x-4">
//             <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-[#86868b]'}`}>Monthly</span>
//             <Switch
//               checked={isAnnual}
//               onCheckedChange={setIsAnnual}
//               className="data-[state=checked]:bg-[#86868b]" />
//             <span className={`text-sm ${isAnnual ? 'text-white' : 'text-[#86868b]'}`}>Annual</span>
//             <span className="ml-2 rounded-full bg-green-500 px-3 py-1 text-xs text-white font-semibold">
//               4 MONTHS FREE✨
//             </span>
//           </div>

//           <div className="mt-24 grid gap-8 md:grid-cols-2 lg:grid-cols-4 px-8 justify-center mx-auto">
//             {plans.map((plan) => (
//               <div
//                 key={plan.name}
//                 className={`rounded-lg relative ${plan.highlighted ? 'border border-green-500' : 'border-gray-900 border'} p-8`}
//               >
//                 {plan.highlighted && (
//                   <div className="absolute -top-3 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
//                     Best Value
//                   </div>
//                 )}
//                 <h3 className="text-xl font-semibold">{plan.name}</h3>
//                 <p className="mt-2 text-sm text-[#86868b]">{plan.description}</p>
//                 <p className="mt-4 text-5xl font-bold">
//                   ${plan.price}
//                   <span className="text-xl font-normal text-[#86868b]">/month</span>
//                 </p>
//                 <Button 
//                   className="mt-6 w-full bg-white text-black hover:bg-[#86868b]"
//                   onClick={() => handleSubscribe(plan.name)}
//                 >
//                   Subscribe
//                 </Button>
//                 <ul className="mt-8 space-y-4">
//                   {plan.features.map((feature) => (
//                     <li key={feature} className="flex items-center">
//                       <Check className="mr-3 h-5 w-5 text-green-500" />
//                       <span className="text-sm">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       <MinimalCreditCalculator />
//     </>
//   )
// }



'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Check } from 'lucide-react'
import MinimalCreditCalculator from './credit-calculator'
import { loadStripe } from '@stripe/stripe-js'
import { auth, db } from '@/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PricingComponent() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        setUser({ ...user, ...userDoc.data() })
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const plans = [
    {
      name: 'Free',
      description: 'Get started with basic features',
      price: 0,
      features: [
        '20 credits',
      ],
      stripePriceId: null,
    },
    {
      name: 'Hobby',
      description: 'Perfect to get started',
      price: isAnnual ? 14 : 19,
      features: [
        '500 credits',
        'Priority support',
        'Access to all future updates',
      ],
      annualPrice: 14 * 12,
      stripePriceId: isAnnual ? 'price_1QaAi9APpzV89AesBfUWkLkb' : 'price_1QaAl4APpzV89AesypPFchfT',
    },
    {
      name: 'Creator',
      description: 'For creators looking to build a following',
      price: isAnnual ? 28 : 39,
      features: [
        '1,000 credits',
        '24/7 dedicated support',
        'Unlimited projects',
        'Access to all future updates'
      ],
      highlighted: true,
      annualPrice: 28 * 12,
      stripePriceId: isAnnual ? 'price_1QaAgvAPpzV89AesQNamEAAE' : 'price_1QaAlkAPpzV89AeslijAAfJJ',
    },
    {
      name: 'Pro Plan',
      description: 'For those who need videos at scale',
      price: isAnnual ? 62 : 89,
      features: [
        '4,000 Credits',
        '24/7 dedicated support',
        'Unlimited projects',
        'Early Access to all future updates',
      ],
      annualPrice: 62 * 12,
      stripePriceId: isAnnual ? 'price_1QZWxoAPpzV89Aeseqxgrks6' : 'price_1QaAmYAPpzV89Aes5KZPZlPA',
    },
  ]

  // Make Animator Studio Free Step 1
  // const handleSubscribe = async (planName: string, stripePriceId: string | null) => {
  //   if (planName === 'Free') {
  //     router.push('/mockup-home')
  //   } else if (stripePriceId) {
  //     if (!user) {
  //       console.error('User must be logged in to subscribe')
  //       // router.push('/login')
  //       router.push('/login?from=pricing')
  //       return
  //     }

  //     try {
  //       console.log('Creating checkout session...')

  //       const response = await fetch('/api/webhooks/stripe', {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           priceId: stripePriceId,
  //           isAnnual,
  //           userId: user.uid,
  //         }),
  //       })

  //       const { sessionId } = await response.json()
  //       const stripe = await stripePromise

  //       if (stripe) {
  //         const { error } = await stripe.redirectToCheckout({ sessionId })
  //         if (error) {
  //           console.error('Error:', error)
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error:', error)
  //     }
  //   }
  // }

  return (
    <>
      <section className="bg-black pt-28 text-white pb-0 lg:pb-20 md:pb-20" id="pricing">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-[#86868b]">Pricing</h2>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[#c8c2bd] mt-6 mx-auto text-center">Simple pricing for everyone.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-center lg:text-xl text-[#86868b] text-[1em]">
            Choose a flexible credit plan that renews monthly.
          </p>

          <div className="mt-12 flex items-center justify-center space-x-4">
            <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-[#86868b]'}`}>Monthly</span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-[#86868b]" />
            <span className={`text-sm ${isAnnual ? 'text-white' : 'text-[#86868b]'}`}>Annual</span>
            <span className="ml-2 rounded-full bg-green-500 px-3 py-1 text-xs text-white font-semibold">
              4 MONTHS FREE✨
            </span>
          </div>

          <div className="mt-24 grid gap-8 md:grid-cols-2 lg:grid-cols-4 px-8 justify-center mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-lg relative ${plan.highlighted ? 'border border-green-500' : 'border-gray-900 border'} p-8`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Best Value
                  </div>
                )}
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="mt-2 text-sm text-[#86868b]">{plan.description}</p>
                <p className="mt-4 text-5xl font-bold">
                  ${plan.price}
                  <span className="text-xl font-normal text-[#86868b]">/month</span>
                  
                </p>
                {isAnnual && plan.annualPrice && (
                         <>
                         <span className="block h-5 text-sm font-semibold text-gray-500 mt-4">${plan.annualPrice} billed annually </span>
                         </>
                         )}
                <Button 
                  className="mt-4 w-full bg-white text-black hover:bg-[#86868b]"
                  // Step 2
                  // onClick={() => handleSubscribe(plan.name, plan.stripePriceId)}
                >
                  Subscribe
                  
                </Button>
                
              
           
            
               
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">                      
                      <Check className="mr-3 h-5 w-5 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <MinimalCreditCalculator />
    </>
  )
}

