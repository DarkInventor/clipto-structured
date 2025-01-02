

'use client'

import { motion } from "framer-motion";
import { X, ArrowRight } from 'lucide-react';
import { useState } from "react";
import Link from 'next/link';

export default function SiteBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="relative z-50 w-full bg-gradient-to-r from-[#86868b] to-[#bdc2c9] hover:from-[#bdc2c9] hover:to-[#e7dfd6]  py-3 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center">
        <Link href="https://easyui.pro" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 group">
          <span className="hidden sm:inline">✨</span>
          <p className="text-sm font-medium">
            <span className="hidden md:inline mr-2">Looking for Free Next.js templates? Visit</span>
            <span className="text-black font-bold ">
            EasyUI.pro
            </span>
            <span className="ml-2 hidden sm:inline">
              - Create stunning websites faster than ever!
            </span>
          </p>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </Link>
        
      </div>
    </motion.div>
  );
}

