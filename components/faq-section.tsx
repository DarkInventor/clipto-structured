'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Mocks Studio?",
    answer: "Mocks Studio is an AI-powered platform that transforms static screenshots into professional video ads instantly. Our intuitive tools help you create engaging video content without any video editing or animation skills."
  },
  {
    question: "How does Mocks Studio work?",
    answer: "Simply upload your screenshot (website, product, or software interface), choose from our curated collection of professional video ad animations, and let our AI handle the transformation. Your video ad will be ready in seconds."
  },
  {
    question: "What types of screenshots can I use?",
    answer: "Mocks Studio supports all common image formats and works with any type of screenshot - whether it's a website, product interface, software application, or mobile app. Our AI adapts to create the most engaging video presentation."
  },
  {
    question: "Do I need video editing experience?",
    answer: "Not at all! Mocks Studio is designed to be completely user-friendly. There's no need for video editing or animation skills - our AI handles all the complex work while you maintain creative control through simple style choices."
  },
  {
    question: "What video formats and resolutions are supported?",
    answer: "We support all major video formats and aspect ratios optimized for different social media platforms and advertising channels. Your videos will be exported in high quality, ready to use across any digital platform."
  }
]

export default function FAQSection() {
  return (
    <section className="bg-black py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h3 className="text-[#86868b] text-sm font-semibold uppercase tracking-wider mb-4">FAQ</h3>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#c8c2bd]">
            Frequently asked questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-lg border-[#86868b]/20 px-6 py-1 hover:border-[#bdc2c9]/30 transition-colors"
            >
              <AccordionTrigger className="text-[#c8c2bd] text-lg font-normal hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#86868b]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12 text-[#86868b]">
          Still have questions? Email us at{' '}
          <a 
            href="mailto:support@mocksstudio.com" 
            className="text-[#c8c2bd] hover:text-[#e7dfd6] transition-colors"
          >
            support@mocksstudio.com
          </a>
        </div>
      </div>
    </section>
  )
}
