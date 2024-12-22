'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Check } from 'lucide-react'

export default function PricingComponent() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: 'Basic',
      description: 'A basic plan for startups and individual users',
      price: isAnnual ? 100 : 10,
      features: [
        'AI-powered analytics',
        'Basic support',
        '5 projects limit',
        'Access to basic AI tools',
      ],
    },
    {
      name: 'Premium',
      description: 'A premium plan for growing businesses',
      price: isAnnual ? 200 : 20,
      features: [
        'Advanced AI insights',
        'Priority support',
        'Unlimited projects',
        'Access to all AI tools',
        'Custom integrations',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      description: 'An enterprise plan with advanced features for large organizations',
      price: isAnnual ? 500 : 50,
      features: [
        'Custom AI solutions',
        '24/7 dedicated support',
        'Unlimited projects',
        'Access to all AI tools',
        'Custom integrations',
        'Data security and compliance',
      ],
    },
    {
      name: 'Ultimate',
      description: 'The ultimate plan with all features for industry leaders',
      price: isAnnual ? 800 : 80,
      features: [
        'Bespoke AI development',
        'White-glove support',
        'Unlimited projects',
        'Priority access to new AI tools',
        'Custom integrations',
        'Highest data security and compliance',
      ],
    },
  ]

  return (
    <section className="bg-black py-20 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-[#86868b]">Pricing</h2>
        <h1 className="text-[2em] sm:text-[2.5em] md:text-[3em] font-semibold leading-[1.0625] tracking-[-0.009em] text-[#c8c2bd] text-center">Simple pricing for everyone.</h1>
        <p className="mx-auto mt-6 max-w-2xl text-center lg:text-xl text-[#86868b] text-[1em]">
          Choose an affordable plan that's packed with the best features for engaging your audience, creating
          customer loyalty, and driving sales.
        </p>

        <div className="mt-12 flex items-center justify-center space-x-4">
          <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-[#86868b]'}`}>Monthly</span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="data-[state=checked]:bg-[#86868b]"
          />
          <span className={`text-sm ${isAnnual ? 'text-white' : 'text-[#86868b]'}`}>Annual</span>
          <span className="ml-2 rounded-full bg-[#86868b]/20 px-3 py-1 text-xs font-medium text-[#86868b]">
            2 MONTHS FREE
          </span>
        </div>

        <div className="mt-24 grid gap-8 md:grid-cols-2 lg:grid-cols-4 px-8 justify-center mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg ${
                plan.highlighted ? 'border border-[#86868b]' : 'border-gray-900 border'
              } p-8`}
            >
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
  )
}