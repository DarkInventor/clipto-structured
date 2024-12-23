'use client'

import { motion } from "framer-motion"
import { SiteHeader } from "@/components/site-header"
import Footer from "@/components/footer-section"

export default function TermsAndPolicy() {
  return (
    <>
      <SiteHeader />
      <div className="min-h-screen w-screen overflow-hidden bg-black font-[Poppins] text-[calc(var(--_size)*0.022)] [--_factor:min(1000px,100vh)] [--_size:min(var(--_factor),100vw)]">
        <div className="relative flex flex-col min-h-screen w-full items-center justify-start pt-32 px-4 md:px-0 pb-20">
          <motion.div
            className="absolute h-full w-full max-w-[44em]"
            initial={{ opacity: 0.3, scale: 1.2 }}
            animate={{ opacity: 0.8, scale: 1.2 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute h-full w-full rounded-[100em] opacity-60 shadow-[inset_0_0_4em_3em_rgba(238,200,175,0.2),inset_0_0_2em_0.4em_rgba(238,200,175,0.2),0_0_0.1em_0.1em_rgba(238,200,175,0.2),0_0_1em_0.4em_rgba(238,200,175,0.3)]"
              initial={{ translateY: "-70%" }}
              animate={{ translateY: "-64%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute h-full w-full rounded-[100em] opacity-60 shadow-[inset_0_0_4em_3em_rgba(238,200,175,0.2),inset_0_0_2em_0.4em_rgba(238,200,175,0.2),0_0_0.1em_0.1em_rgba(238,200,175,0.2),0_0_1em_0.4em_rgba(238,200,175,0.3)]"
              initial={{ translateY: "70%" }}
              animate={{ translateY: "64%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </motion.div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.h1 
              className="text-[2em] sm:text-[2.5em] md:text-[3em] font-semibold text-center mb-12 text-[#c8c2bd]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Terms & Policies
            </motion.h1>

            <motion.div
              className="space-y-8 text-[#c8c2bd]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <section className="space-y-4">
                <h2 className="text-xl font-semibold">1. Introduction</h2>
                <p className="text-[#86868b] leading-relaxed">
                  Welcome to Mockup Studio. By accessing or using our services, you agree to comply with these Terms of Service. If you disagree with any part of these terms, please refrain from using our services.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold">2. Services Provided</h2>
                <p className="text-[#86868b] leading-relaxed">
                  Mockup Studio offers tools to transform screenshots, recordings, and images into animated mockup ads and videos. We reserve the right to modify or discontinue any aspect of our services at our discretion.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold">3. User Responsibilities</h2>
                <div className="text-[#86868b] leading-relaxed space-y-2">
                  <p>- Account Accuracy: Provide accurate, current, and complete information during registration.</p>
                  <p>- Prohibited Activities: Do not use our services for unlawful purposes or to infringe upon others' rights.</p>
                  <p>- Security: Maintain the confidentiality of your account credentials and notify us of any unauthorized access.</p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold">4. Subscription and Payment</h2>
                <div className="text-[#86868b] leading-relaxed space-y-2">
                  <p>- Pricing: Our services are available on a subscription basis. Pricing details are provided on our website.</p>
                  <p>- Billing: Payments are due as specified in your subscription plan.</p>
                  <p>- Refunds: Payments are non-refundable unless otherwise stated.</p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold">5. Intellectual Property</h2>
                <p className="text-[#86868b] leading-relaxed">
                  All content, software, and materials provided by Mockup Studio are our property or licensed to us. You are granted a limited, non-exclusive license to use our services for personal or business purposes, subject to these terms.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold">6. Privacy Policy</h2>
                <p className="text-[#86868b] leading-relaxed">
                  Your use of our services is governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold">7. Limitation of Liability</h2>
                <p className="text-[#86868b] leading-relaxed">
                  Mockup Studio is not liable for indirect, incidental, or consequential damages arising from your use of our services. Our total liability is limited to the amount you paid for the service in the past 12 months.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold">8. Termination</h2>
                <p className="text-[#86868b] leading-relaxed">
                  We may suspend or terminate your access to our services if you violate these terms. You may terminate your account at any time by following the instructions in your account settings.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold">9. Governing Law</h2>
                <p className="text-[#86868b] leading-relaxed">
                  These terms are governed by the laws of Toronto. Any disputes will be resolved in the competent courts of Toronto.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold">10. Changes to Terms</h2>
                <p className="text-[#86868b] leading-relaxed">
                  We may update these terms periodically. Significant changes will be communicated via email or through our website. Continued use of our services after such changes constitutes your acceptance of the new terms.
                </p>
              </section>

              <section className="space-y-4 mt-16">
                <h2 className="text-2xl font-semibold">Privacy Policy</h2>
                
                <div className="space-y-8">
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold">1. Information We Collect</h3>
                    <div className="text-[#86868b] leading-relaxed space-y-2">
                      <p>- Personal Information: Name, email address, payment details, and other information you provide.</p>
                      <p>- Usage Data: Information about how you interact with our services, including IP addresses and device information.</p>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold">2. How We Use Your Information</h3>
                    <div className="text-[#86868b] leading-relaxed space-y-2">
                      <p>- Service Provision: To deliver and improve our services.</p>
                      <p>- Communication: To send updates, promotional materials, and respond to inquiries.</p>
                      <p>- Legal Compliance: To comply with legal obligations and protect our rights.</p>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold">3. Contact Us</h3>
                    <p className="text-[#86868b] leading-relaxed">
                      For questions about these terms or policies, please contact us at{" "}
                      <a href="mailto:ktmehta25@gmail.com" className="text-[#e7dfd6] hover:underline">
                        ktmehta25@gmail.com
                      </a>
                    </p>
                  </section>
                </div>
              </section>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
