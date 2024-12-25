import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface AuthSuccessPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthSuccessPopup({ isOpen, onClose }: AuthSuccessPopupProps) {
  const [isVisible, setIsVisible] = useState(isOpen)

  useEffect(() => {
    setIsVisible(isOpen)
  }, [isOpen])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md p-8 rounded-lg border border-white/10 bg-black/80 backdrop-blur-xl text-white shadow-lg"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-[#c8c2bd]">Welcome Back!</h2>
            <p className="text-[#86868b] mb-6">
              Thank you for authenticating. Please choose a plan from our pricing options to continue.
            </p>
            <div className="flex justify-center">
              <Button
                onClick={onClose}
                className="bg-gradient-to-r from-[#86868b] to-[#bdc2c9] text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6]"
              >
                View Pricing Plans
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
