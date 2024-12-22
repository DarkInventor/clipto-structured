import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { PlayIcon, DownloadIcon } from '@radix-ui/react-icons'

interface HeaderProps {
  selectedTemplate: string
  onRender: () => void
  isRenderDisabled: boolean
  renderedVideoUrl: string | null
}

export default function Header({ 
  selectedTemplate, 
  onRender, 
  isRenderDisabled,
  renderedVideoUrl 
}: HeaderProps) {
  // Add debug logs
  useEffect(() => {
    console.log('Header renderedVideoUrl:', renderedVideoUrl);
  }, [renderedVideoUrl]);

  const handleDownload = async () => {
    if (!renderedVideoUrl) return;
    console.log('Downloading video from URL:', renderedVideoUrl);

    try {
      const response = await fetch(renderedVideoUrl);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `clipto-video-${Date.now()}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading video:', error);
      alert('Failed to download video. Please try again.');
    }
  };

  // Add debug log for rendering
  console.log('Header rendering with renderedVideoUrl:', renderedVideoUrl);

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between py-5 bg-black border-b border-white/5 px-4 overflow-hidden">
      <h2 className="text-xl sm:text-xl font-semibold text-[#c8c2bd] leading-7 tracking-tight mb-2 sm:mb-0 font-[Poppins]">
        {selectedTemplate}
      </h2>
      
      {renderedVideoUrl ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          className="text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6] bg-gradient-to-r from-[#86868b] to-[#bdc2c9] 
            border-none px-6 py-2.5 rounded-full flex items-center transition-all duration-300 ease-in-out
            shadow-[0_0_15px_rgba(189,194,201,0.3)] font-[Poppins] font-medium"
        >
          <DownloadIcon className="mr-2 h-4 w-4" />
          Download Video
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: isRenderDisabled ? 1 : 1.05 }}
          whileTap={{ scale: isRenderDisabled ? 1 : 0.95 }}
          onClick={onRender}
          className={`text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6] bg-gradient-to-r from-[#86868b] to-[#bdc2c9] 
            border-none px-6 py-2.5 rounded-full flex items-center transition-all duration-300 ease-in-out
            shadow-[0_0_15px_rgba(189,194,201,0.3)] font-[Poppins] font-medium
            ${isRenderDisabled ? 'opacity-50 cursor-not-allowed hover:from-[#86868b] hover:to-[#bdc2c9]' : 
            'hover:shadow-[0_0_25px_rgba(189,194,201,0.5)] transform hover:-translate-y-0.5'}`}
          disabled={isRenderDisabled}
        >
          <PlayIcon className="mr-2 h-4 w-4" />
          Render <span className="ml-2 text-sm hidden sm:inline opacity-75">⌘ + J</span>
        </motion.button>
      )}
    </header>
  )
}