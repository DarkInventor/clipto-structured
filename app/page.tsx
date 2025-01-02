"use client";

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer-section";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTA";
import OverlappingAppShowcase from "@/components/overlapping-showcase";
import AnimatedStats from "@/components/animated-stats";
import FAQSection from "@/components/faq-section";
import { AuthCheck } from "@/components/AuthCheck";


export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* <App /> */}
      {/* <Landing /> */}
      {/* <Navbar /> */}
      <Hero />
      <OverlappingAppShowcase />
      <AnimatedStats />
      <HowItWorks />
      {/* Step 3 */}
      {/* <Pricing /> */}
      <FAQSection />
      <CTASection />
      < Footer />
      <Toaster />
    </div>
  );
}
