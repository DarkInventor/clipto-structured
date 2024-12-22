'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface StatItemProps {
  endValue: number
  suffix?: string
  label: string
  duration?: number
}

function StatItem({ endValue, suffix = '', label, duration = 2 }: StatItemProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  useEffect(() => {
    if (isInView) {
      let startTime: number
      let animationFrame: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = (timestamp - startTime) / (duration * 1000)

        if (progress < 1) {
          setCount(Math.min(Math.floor(endValue * progress), endValue))
          animationFrame = requestAnimationFrame(animate)
        } else {
          setCount(endValue)
        }
      }

      animationFrame = requestAnimationFrame(animate)

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
      }
    }
  }, [isInView, endValue, duration])
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="text-center"
    >
      <motion.div 
        className="text-[2em] sm:text-[2.5em] md:text-[3em] font-semibold leading-[1.0625] tracking-[-0.009em] text-[#c8c2bd] mb-2 tabular-nums"
      >
        {count.toLocaleString()}{suffix}
      </motion.div>
      <div className="text-[#86868b] text-sm font-semibold uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  )
}

export default function AnimatedStats() {
  const stats = [
    { value: 1500000, suffix: '+', label: 'Views Generated' },
    { value: 2000, suffix: '+', label: 'Active Creators' }, 
    { value: 15000, suffix: '+', label: 'Videos Created' },
    { value: 85, suffix: '+', label: 'Countries Reached' },
  ]

  return (
    <section className="bg-black py-16 md:py-4">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[2em] sm:text-[2.5em] md:text-[3em] font-semibold leading-[1.0625] tracking-[-0.009em] text-center mb-16 max-w-3xl mx-auto"
        >
          <span className="text-3xl sm:text-4xl font-bold mb-4 text-[#c8c2bd]">
            Empowering creators worldwide to produce stunning video content at scale
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 ">
          {stats.map((stat, index) => (
            <StatItem 
              key={index}
              endValue={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              duration={2 + index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
