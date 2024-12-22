import React from 'react'
import { motion } from 'framer-motion'
import { PlusIcon } from '@radix-ui/react-icons'

interface MediaUploadProps {
  onUpload: () => void
}

export default function MediaUpload({ onUpload }: MediaUploadProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-black rounded-xl p-8">
      <motion.div
        className="absolute h-full w-full max-w-[44em] opacity-30"
        initial={{ opacity: 0.2, scale: 1.1 }}
        animate={{ opacity: 0.3, scale: 1.1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute h-full w-full rounded-[100em] opacity-60 shadow-[inset_0_0_4em_3em_rgba(238,200,175,0.2),inset_0_0_2em_0.4em_rgba(238,200,175,0.2),0_0_0.1em_0.1em_rgba(238,200,175,0.2),0_0_1em_0.4em_rgba(238,200,175,0.3)]"
          initial={{ translateY: "-70%" }}
          animate={{ translateY: "-64%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </motion.div>

      <h2 className="text-[#c8c2bd] text-xl font-semibold mb-4 z-10">
        Start Creating Your Video Ad
      </h2>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onUpload}
        className="text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6] bg-gradient-to-r from-[#86868b] to-[#bdc2c9] 
          border-none px-6 py-2.5 rounded-full flex items-center transition-all duration-300 ease-in-out
          shadow-[0_0_15px_rgba(189,194,201,0.3)] font-[Poppins] font-medium z-10"
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        Upload Image or Video
      </motion.button>

      <p className="text-[#86868b] text-sm mt-4 max-w-md text-center z-10">
        Upload your website, product, or software screenshots to transform them into professional video ads
      </p>
    </div>
  )
}
