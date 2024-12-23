'use client'

import { useEffect, useRef } from 'react'
import { Card } from "@/components/ui/card"
import { motion } from 'framer-motion'

export default function OverlappingAppShowcase() {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  return (
    <div className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden pb-10">
      {/* Added heading section */}
      <div className="text-center mb-16 max-w-3xl mb-28">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#c8c2bd]">
          Create Videos Like These In Minutes
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center lg:text-xl text-[#86868b] text-[1em]">
          Whether you're showcasing your app, website or product - turn your screenshots into engaging video that capture attention. No video editing skills needed.
        </p>
      </div>

        {/* Overlapping Screens */}
        <div className="relative w-full flex items-center justify-center gap-[-2rem] scale-110 py-10">
          {/* Left Screen */}
          <Card className="w-[45%] aspect-video bg-gradient-to-br from-[#86868b] to-[#bdc2c9] rounded-2xl shadow-2xl transform -rotate-2 -translate-x-6 hover:rotate-0 hover:scale-105 transition-all duration-300 overflow-hidden z-10 border-0  ml-12">
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="https://pub-a49ce427d0254ca983d7c77bb50b7846.r2.dev/overlapping1.mp4" type="video/mp4" />
              </video>
              {/* <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-[#fffaf6] font-semibold text-xl">Screenshot to Video</h3>
                <p className="text-[#c8c2bd] text-base">Transform static images into motion</p>
              </div> */}
            </div>
          </Card>

          {/* Center Screen */}
          <Card className="w-[48%] aspect-video bg-gradient-to-br from-[#000000] to-[#86868b] shadow-2xl transform hover:scale-105 transition-all duration-300 z-20 border-0 ">
            <div className="relative w-full h-full ">
              <video
                className="w-full h-full object-cover rounded-2xl"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="https://pub-a49ce427d0254ca983d7c77bb50b7846.r2.dev/overlapping2.mp4" type="video/mp4" />
              </video>
              {/* <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-[#fffaf6] font-semibold text-2xl">Video Editor</h3>
                <p className="text-[#c8c2bd] text-base">Your creative command center</p>
              </div> */}
            </div>
          </Card>

          {/* Right Screen */}
          <Card className="w-[45%] aspect-video bg-gradient-to-br from-[#bdc2c9] to-[#e7dfd6] rounded-2xl shadow-2xl transform rotate-2 translate-x-6 hover:rotate-0 hover:scale-105 transition-all duration-300 overflow-hidden z-10 border-0 mt-0 mr-12">
            <div className="relative w-full h-full">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="https://pub-a49ce427d0254ca983d7c77bb50b7846.r2.dev/overlapping3.mp4" type="video/mp4" />
              </video>
              {/* <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-[#fffaf6] font-semibold text-xl">Export & Share</h3>
                <p className="text-[#c8c2bd] text-base">Publish anywhere instantly</p>
              </div> */}
            </div>
          </Card>
        </div>
      </div>
    // </div>
  )
}
