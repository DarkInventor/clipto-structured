import Link from 'next/link'
import { Twitter } from 'lucide-react'
import { DiscordLogoIcon } from '@radix-ui/react-icons'

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-20 px-10 sm:px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Logo and Tagline */}
          <div className="mb-8 lg:mb-0">
            <Link href="/" className="flex items-center">
              <span className="text-[#c8c2bd] font-bold lg:text-xl text-[1em]">Animator Studio</span>
            </Link>
            <p className="mt-2 lg:text-md text-[1em] text-[#c8c2bd] max-w-[xl]">Create Beautiful Animations From Screenshots & Recordings In Seconds</p>
          </div>

          {/* Links Sections */}
          <div className="flex flex-wrap justify-between lg:w-1/2 gap-8">
            {/* Product Links */}
            <div>
              <h3 className="font-semibold mb-4 text-[#c8c2bd] text-[0.9em] lg:text-[1em]">PRODUCT</h3>
              <ul className="space-y-2 text-[0.9em] lg:text-[1em]">
                <li><Link href="/#howitworks" className="hover:text-white transition-colors text-[#c8c2bd] text-[0.9em] lg:text-[1em]">How it Works</Link></li>
                <li><Link href="/#pricing" className="hover:text-white transition-colors text-[#c8c2bd] text-[0.9em] lg:text-[1em]">Pricing</Link></li>
                <li><Link href="/mockup-home" className="hover:text-white transition-colors text-[#c8c2bd] text-[0.9em] lg:text-[1em]">Create Video Ad</Link></li>
                <li><Link href="/changelog" className="hover:text-white transition-colors text-[#c8c2bd] text-[0.9em] lg:text-[1em]">Changelog</Link></li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-[#c8c2bd] font-semibold mb-4 text-[0.9em] lg:text-[1em]">RESOURCES</h3>
              <ul className="space-y-2 text-[0.9em] lg:text-[1em]">
                <li><Link href="/" className="hover:text-white transition-colors text-[#c8c2bd] text-[0.9em] lg:text-[1em]">Introduction</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors text-[#c8c2bd] text-[0.9em] lg:text-[1em]">Blog</Link></li>
                <li><Link href="mailto:ktmehta25@gmail.com" className="hover:text-white transition-colors text-[#c8c2bd] text-[0.9em] lg:text-[1em]">Support</Link></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className='text-[0.9em] lg:text-[1em]'>
              <h3 className="text-[#c8c2bd] font-semibold mb-4 text-[0.9em] lg:text-[1em]">LEGAL</h3>
              <ul className="space-y-2 text-[0.9em] lg:text-[1em]">
                <li><Link href="/terms-policy" className="hover:text-white transition-colors text-[#c8c2bd] text-[0.9em] lg:text-[1em]">Terms</Link></li>
                <li><Link href="/terms-policy" className="hover:text-white transition-colors text-[#c8c2bd] text-[0.9em] lg:text-[1em]">Privacy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 sm:mb-0">
            <Link href="https://discord.gg/Mockstudio" className="text-gray-400 hover:text-white transition-colors text-[#c8c2bd]">
              <DiscordLogoIcon className="h-5 w-5 lg:h-6 lg:w-6 text-[#c8c2bd]" />
              <span className="sr-only text-[#c8c2bd]">Discord</span>
            </Link>
            <Link href="https://x.com/kathanmehtaa" className="text-[#c8c2bd] hover:text-white transition-colors">
              <Twitter size={24} className='h-5 w-5 lg:h-6 lg:w-6 text-[#c8c2bd]'/>
              <span className="sr-only text-[#c8c2bd]">Twitter</span>
            </Link>
          </div>
          <p className="text-sm text-[#c8c2bd]">
            Copyright © {new Date().getFullYear()} Animator Studio. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}