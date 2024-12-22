'use client'

import { Upload, Palette, Play } from 'lucide-react'
import Image from 'next/image'

export default function HowItWorks() {
  return (
    <section className="bg-black text-white py-10 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#86868b]/10 via-transparent to-transparent opacity-40" />
    
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#c8c2bd]">How It Works</h2>
          <p className="text-[#86868b] text-lg">Transform any screenshot into a professional video ad in seconds - no video skills needed</p>
        </div>

        <div className="space-y-24 py-10">
          {/* Step 1 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center group">
            <div className="space-y-6">
              <div className="text-[#86868b] text-xl font-semibold">Step 1</div>
              <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#c8c2bd]">
                Upload Your Screenshot
              </h3>
              <p className="text-[#86868b] text-lg sm:text-xl max-w-xl">
                Start by uploading any screenshot - website, product, or software interface. We support all common image formats to turn your static visuals into engaging video ads.
              </p>
              <div className="inline-flex items-center space-x-2 text-[#bdc2c9] hover:text-[#e7dfd6] transition-colors cursor-pointer group">
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
          <div className="grid lg:grid-cols-2 gap-12 items-center group">
            <div className="space-y-6 lg:order-2">
              <div className="text-[#86868b] text-xl font-semibold">Step 2</div>
              <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#c8c2bd]">
                Choose Your Ad Style
              </h3>
              <p className="text-[#86868b] text-lg sm:text-xl max-w-xl">
                Pick from our curated collection of professional video ad animations. Each style is designed to grab attention and showcase your product in the most engaging way.
              </p>
              <div className="inline-flex items-center space-x-2 text-[#bdc2c9] hover:text-[#e7dfd6] transition-colors cursor-pointer group">
                <Palette className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="group-hover:translate-x-1 transition-transform">Browse ad styles</span>
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
          <div className="grid lg:grid-cols-2 gap-12 items-center group">
            <div className="space-y-6">
              <div className="text-[#86868b] text-xl font-semibold">Step 3</div>
              <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#c8c2bd]">
                Generate Your Video Ad
              </h3>
              <p className="text-[#86868b] text-lg sm:text-xl max-w-xl">
                Click once and watch as your screenshot transforms into a polished video ad. Our AI handles all the animation work, delivering a professional result in seconds - no video editing skills required.
              </p>
              <div className="inline-flex items-center space-x-2 text-[#bdc2c9] hover:text-[#e7dfd6] transition-colors cursor-pointer group">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="group-hover:translate-x-1 transition-transform">Create video ad</span>
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
