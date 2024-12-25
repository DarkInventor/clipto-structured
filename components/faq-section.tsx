'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Animator Studio?",
    answer: "Animator Studio is an innovative platform that transforms your screenshots and screen recordings into stunning video ads within seconds. We help you create beautiful mockup ads, product videos, and animated website demos without requiring any design skills."
  },
  {
    question: "How does Animator Studio work?",
    answer: "It's simple! First, upload your screenshots or screen recordings - we support all common formats. Then choose from our collection of professional animation styles. Finally, export your animated video ready to share. The entire process takes just seconds."
  },
  {
    question: "What can I create with Animator Studio?",
    answer: "You can create professional mockup ads, product videos, and animated website demos. Whether you need content for social media, websites, or presentations, Animator Studio helps you transform boring screenshots and recordings into engaging animated videos."
  },
  {
    question: "Do I need design or animation skills?",
    answer: "Not at all! Animator Studio is designed to handle all the complex animation work while you maintain creative control through simple style choices. No design skills needed - just upload your media and let us handle the magic."
  },
  {
    question: "What media formats do you support?",
    answer: "We support all common image and video formats for your screenshots and screen recordings. Your exported videos will be optimized for social media, websites, and presentations - perfect for sharing across any digital platform."
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
            href="mailto:ktmehta25@gmail.com" 
            className="text-[#c8c2bd] hover:text-[#e7dfd6] transition-colors"
          >
            ktmehta25@gmail.com
          </a>
        </div>
      </div>
    </section>
  )
}
