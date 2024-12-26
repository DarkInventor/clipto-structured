'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-24 bg-black font-[Poppins] text-[calc(var(--_size)*0.022)] [--_factor:min(1000px,100vh)] [--_size:min(var(--_factor),100vw)]">
      <div className="w-full mx-auto px-5 sm:px-10 md:px-12 lg:px-40">
        <motion.div 
          className="w-full relative py-8 md:py-10 px-6 md:px-8 rounded-2xl bg-black overflow-hidden flex justify-center items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute h-full w-full max-w-[44em]"
            initial={{ opacity: 0.3, scale: 1.2 }}
            animate={{ opacity: 0.8, scale: 1.2 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <motion.div
              className="absolute h-full w-full rounded-[100em] opacity-60 shadow-[inset_0_0_4em_3em_rgba(238,200,175,0.2),inset_0_0_2em_0.4em_rgba(238,200,175,0.2),0_0_0.1em_0.1em_rgba(238,200,175,0.2),0_0_1em_0.4em_rgba(238,200,175,0.3)]"
              initial={{ translateY: '-70%' }}
              animate={{ translateY: '-64%' }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute h-full w-full rounded-[100em] opacity-60 shadow-[inset_0_0_4em_3em_rgba(238,200,175,0.2),inset_0_0_2em_0.4em_rgba(238,200,175,0.2),0_0_0.1em_0.1em_rgba(238,200,175,0.2),0_0_1em_0.4em_rgba(238,200,175,0.3)]"
              initial={{ translateY: '70%' }}
              animate={{ translateY: '64%' }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
          </motion.div>
          <div className="mx-auto text-center w-full relative space-y-8 max-w-6xl">
            <motion.h2 
              className="text-[2em] sm:text-[2.5em] md:text-[3em] font-semibold leading-[1.0625] tracking-[-0.009em] text-[#c8c2bd]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Turn Your {' '}
              <motion.span
                className="relative inline-block"
                initial={{ scale: 1 }}
                animate={{ scale: 1.02 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <span className="relative z-10 bg-gradient-to-b from-[#dfe5ee] to-[#fffaf6] bg-clip-text text-transparent filter-[url(#glow-4)]">
                   &nbsp;Boring Screenshots & Recordings
                </span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-b from-[#dfe5ee] to-[#fffaf6] bg-clip-text text-transparent filter-[url(#glow-4)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.24 }}
                  aria-hidden="true"
                >
                 &nbsp;Boring Screenshots & Recordings 
                </motion.span>{' '}
              </motion.span>{' '}
                  into Animated Videos within Seconds
            </motion.h2>
            <motion.p 
              className="absolute left-0 right-0 mx-auto mt-[8em] sm:mt-[10em] md:mt-[12em] max-w-[28em] bg-gradient-to-b from-[#86868b] to-[#bdc2c9] bg-clip-text text-center font-semibold text-transparent text-sm sm:text-base md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Create stunning video ads, social media posts and product demos in seconds. {' '}
              <span className="relative inline-block font-extrabold text-[#e7dfd6]">No design skills needed.</span>
            </motion.p>
            <motion.div 
              className="mx-auto max-w-[65%]  lg:max-w-[25%] flex justify-center pt-24 flex flex-col w-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link href="/mockup-home" className="outline-none h-10 px-5 rounded-xl bg-gradient-to-r from-[#86868b] to-[#bdc2c9] text-black font-semibold flex items-center justify-center hover:from-[#bdc2c9] hover:to-[#e7dfd6] transition-all duration-300 mt-5">
                Get Started Now
              </Link>
              <p className="mt-4 text-sm text-[#86868b] font-normal">No Credit Card Required</p>  
            </motion.div>
            
          </div>
        </motion.div>
      </div>
      <svg className="absolute z-[-1] h-0 w-0" width="1440px" height="300px" viewBox="0 0 1440 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow-4" colorInterpolationFilters="sRGB" x="-50%" y="-200%" width="200%" height="500%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur4" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="19" result="blur19" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur9" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur30" />
            <feColorMatrix
              in="blur4"
              result="color-0-blur"
              type="matrix"
              values="1 0 0 0 0 0 0.9803921568627451 0 0 0 0 0 0.9647058823529412 0 0 0 0 0 0.8 0"
            />
            <feOffset in="color-0-blur" result="layer-0-offsetted" dx="0" dy="0" />
            <feColorMatrix
              in="blur19"
              result="color-1-blur"
              type="matrix"
              values="0.8156862745098039 0 0 0 0 0 0.49411764705882355 0 0 0 0 0 0.2627450980392157 0 0 0 0 0 1 0"
            />
            <feOffset in="color-1-blur" result="layer-1-offsetted" dx="0" dy="2" />
            <feColorMatrix
              in="blur9"
              result="color-2-blur"
              type="matrix"
              values="1 0 0 0 0 0 0.6666666666666666 0 0 0 0 0 0.36470588235294116 0 0 0 0 0 0.65 0"
            />
            <feOffset in="color-2-blur" result="layer-2-offsetted" dx="0" dy="2" />
            <feColorMatrix
              in="blur30"
              result="color-3-blur"
              type="matrix"
              values="1 0 0 0 0 0 0.611764705882353 0 0 0 0 0 0.39215686274509803 0 0 0 0 0 1 0"
            />
            <feOffset in="color-3-blur" result="layer-3-offsetted" dx="0" dy="2" />
            <feMerge>
              <feMergeNode in="layer-0-offsetted" />
              <feMergeNode in="layer-1-offsetted" />
              <feMergeNode in="layer-2-offsetted" />
              <feMergeNode in="layer-3-offsetted" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </section>
  )
}