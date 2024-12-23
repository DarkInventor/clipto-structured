'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Check } from 'lucide-react'
import MinimalCreditCalculator from './credit-calculator'

export default function PricingComponent() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: 'Free',
      description: 'Get started with basic features',
      price: isAnnual ? 0 : 0,
      features: [
        '20 credits',
        // 'Basic support',
        // '5 projects limit',
        // 'Access to basic AI tools',
      ],
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
    },
  ]

  return (
    <><section className="bg-black pt-28 text-white pb-0 lg:pb-20 md:pb-20" id="pricing">
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
          <span className="ml-2 rounded-full bg-[#86868b]/20 px-3 py-1 text-xs font-medium text-[#86868b]">
            2 MONTHS FREE
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
              <Button className="mt-6 w-full bg-white text-black hover:bg-[#86868b]">Subscribe</Button>
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