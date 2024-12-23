'use client'

import { Upload, Palette, Play } from 'lucide-react'
import Image from 'next/image'

export default function HowItWorks() {
  return (
    <section className="bg-black text-white pt-40 relative overflow-hidden" id="howitworks">
      {/* Background gradient effects */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-[#86868b]/10 via-transparent to-transparent opacity-40" /> */}
    
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-24">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#c8c2bd]">How it Works</h2>
          <p className="mx-auto mt-6 max-w-2xl text-center lg:text-xl text-[#86868b] text-[1em]">Transform your screenshots and screen recordings into stunning video ads in seconds - no design skills needed</p>
        </div>

        <div className="space-y-48 py-16">
          {/* Step 1 */}
          <div className="grid lg:grid-cols-2 gap-16 items-center group">
            <div className="space-y-8">
              <div className="text-[#86868b] text-xl font-semibold">Step 1</div>
              <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#c8c2bd]">
                Upload Your Media
              </h3>
              <p className="text-[#86868b] text-lg sm:text-xl max-w-xl">
                Start by uploading your screenshots or screen recordings. We support all common image and video formats to help you create beautiful mockup ads and animated website demos.
              </p>
              <div className="inline-flex items-center space-x-3 text-[#bdc2c9] hover:text-[#e7dfd6] transition-colors cursor-pointer group">
                <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="group-hover:translate-x-1 transition-transform">Drag and drop or browse</span>
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#86868b]/20 group-hover:border-[#bdc2c9]/30 transition-colors shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#bdc2c9]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Image 
                className="w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                src="https://pub-a49ce427d0254ca983d7c77bb50b7846.r2.dev/step1.png"
                fill           
                alt="step1"
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid lg:grid-cols-2 gap-16 items-center group">
            <div className="space-y-8 lg:order-2">
              <div className="text-[#86868b] text-xl font-semibold">Step 2</div>
              <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#c8c2bd]">
                Select Animation Style
              </h3>
              <p className="text-[#86868b] text-lg sm:text-xl max-w-xl">
                Choose from our collection of professional animation styles. Whether you're creating mockup ads, product videos, or animated website demos, we have the perfect style to make your content stand out.
              </p>
              <div className="inline-flex items-center space-x-3 text-[#bdc2c9] hover:text-[#e7dfd6] transition-colors cursor-pointer group">
                <Palette className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="group-hover:translate-x-1 transition-transform">Browse animation styles</span>
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#86868b]/20 lg:order-1 group-hover:border-[#bdc2c9]/30 transition-colors shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#bdc2c9]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Image 
                className="w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                src="https://pub-a49ce427d0254ca983d7c77bb50b7846.r2.dev/step2.png"
                fill           
                alt="step-2"
              />
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid lg:grid-cols-2 gap-16 items-center group">
            <div className="space-y-8">
              <div className="text-[#86868b] text-xl font-semibold">Step 3</div>
              <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#c8c2bd]">
                Export & Download
              </h3>
              <p className="text-[#86868b] text-lg sm:text-xl max-w-xl">
                Once your animation is ready, export and download it. Perfect for social media, websites, or presentations - get your professional video ad ready to share in seconds.
              </p>
              <div className="inline-flex items-center space-x-3 text-[#bdc2c9] hover:text-[#e7dfd6] transition-colors cursor-pointer group">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="group-hover:translate-x-1 transition-transform">Download video</span>
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#86868b]/20 group-hover:border-[#bdc2c9]/30 transition-colors shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#bdc2c9]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Image 
                className="w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                src="https://pub-a49ce427d0254ca983d7c77bb50b7846.r2.dev/step3.png"
                fill           
                alt="step-3"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
