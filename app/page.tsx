"use client";

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer-section";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTA";


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* <App /> */}
      {/* <Landing /> */}
      {/* <Navbar /> */}
      <Hero />
      <HowItWorks />
      <Pricing />
      <CTASection />
      < Footer />
      <Toaster />
    </div>
  );
}
