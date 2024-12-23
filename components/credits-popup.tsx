import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRightIcon, Cross1Icon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

interface CreditsPopupProps {
  credits: number | null
  loading: boolean
  error: Error | null
  onClose: () => void
}

export default function CreditsPopup({ credits, loading, error, onClose }: CreditsPopupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-md p-8 rounded-lg border border-white/10 bg-black/50 backdrop-blur-xl text-center"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-b from-[#c8c2bd] to-[#86868b] bg-clip-text text-transparent">
          Your Credits
        </h2>
        {loading ? (
          <p className="text-[#86868b]">Loading credits...</p>
        ) : error ? (
          <p className="text-red-500">Error loading credits. Please try again.</p>
        ) : (
          <motion.div
            className="relative inline-block"
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 1, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
          >
            <span className="text-6xl font-bold bg-gradient-to-b from-[#e7dfd6] to-[#bdc2c9] bg-clip-text text-transparent filter-[url(#glow-4)]">
              {credits}
            </span>
          </motion.div>
        )}
        <p className="mt-4 text-[#86868b]">Available credits for creating stunning video ads</p>
        <Button
          variant="outline"
          className="mt-6 text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6] bg-gradient-to-r from-[#86868b] to-[#bdc2c9] border-none"
          size="lg"
          onClick={onClose}
        >
          Close <Cross1Icon className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  )
}

