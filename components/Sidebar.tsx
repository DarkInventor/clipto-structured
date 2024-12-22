// import React from 'react'
// import { motion } from 'framer-motion'
// import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

// interface SidebarProps {
//   children: React.ReactNode
//   className?: string
//   isOpen: boolean
//   onToggle: () => void
//   position: 'left' | 'right'
// }

// export default function Sidebar({ children, className, isOpen, onToggle, position }: SidebarProps) {
//   return (
//     <motion.div
//       initial={false}
//       animate={{ 
//         width: isOpen ? '16rem' : '0',
//         [position]: isOpen ? 0 : '-16rem'
//       }}
//       transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//       className={`bg-white dark:bg-gray-800 overflow-hidden fixed top-0 bottom-0 z-10 ${position}-0 lg:relative ${className}`}
//     >
//       <div className="w-64 h-full overflow-y-auto">
//         {children}
//       </div>
//       <button
//         onClick={onToggle}
//         className={`absolute top-1/2 ${position === 'left' ? '-right-2' : '-left-2'} bg-white dark:bg-gray-800 p-2 rounded-full shadow-md`}
//       >
//         {isOpen ? 
//           (position === 'left' ? <ChevronLeftIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />) : 
//           (position === 'left' ? <ChevronRightIcon className="h-4 w-4" /> : <ChevronLeftIcon className="h-4 w-4" />)
//         }
//       </button>
//     </motion.div>
//   )
// }
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon, HomeIcon, VideoIcon, TextAlignLeftIcon, PersonIcon, GearIcon, ExitIcon } from '@radix-ui/react-icons'
import TemplateList from './TemplateList'
import ConfigurationPanel from './ConfigurationPanel'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

interface SidebarProps {
  children?: React.ReactNode
  className?: string
  isOpen: boolean
  onToggle: () => void
  selectedTemplate: string
  onSelectTemplate: (template: any) => void
  selectedAspectRatio: {
    name: string
    value: string
    width: number
    height: number
  }
  setSelectedAspectRatio: React.Dispatch<React.SetStateAction<any>>
  selectedDuration: number
  setSelectedDuration: React.Dispatch<React.SetStateAction<number>>
  adTitle: string
  setAdTitle: React.Dispatch<React.SetStateAction<string>>
  adDescription: string
  setAdDescription: React.Dispatch<React.SetStateAction<string>>
  audioVolume: number
  isMuted: boolean
  handleVolumeChange: (vol: number) => void
  toggleMute: () => void
  scenes: any[]
  dispatch: (action: any) => void
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}

export default function Sidebar({ 
  className,
  isOpen, 
  onToggle,
  selectedTemplate,
  onSelectTemplate,
  selectedAspectRatio,
  setSelectedAspectRatio,
  selectedDuration,
  setSelectedDuration,
  adTitle,
  setAdTitle,
  adDescription,
  setAdDescription,
  audioVolume,
  isMuted,
  handleVolumeChange,
  toggleMute,
  scenes,
  dispatch,
  backgroundColor,
  setBackgroundColor,
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState('home')
  const { signOut } = useAuth()
  const router = useRouter()

  const menuItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'animations', label: 'Animation Styles', icon: VideoIcon },
    { id: 'brand', label: 'Brand & Audio', icon: TextAlignLeftIcon },
  ]

  const profileItems = [
    { id: 'profile', label: 'Profile', icon: PersonIcon, onClick: () => router.push('/profile') },
    { id: 'settings', label: 'Settings', icon: GearIcon },
    { id: 'logout', label: 'Logout', icon: ExitIcon, onClick: signOut },
  ]

  const renderContent = () => {
    switch(activeTab) {
      case 'animations':
        return (
          <TemplateList
            selectedTemplate={selectedTemplate}
            onSelectTemplate={onSelectTemplate}
          />
        )
      case 'brand':
        return (
          <ConfigurationPanel
            selectedAspectRatio={selectedAspectRatio}
            setSelectedAspectRatio={setSelectedAspectRatio}
            selectedDuration={selectedDuration}
            setSelectedDuration={setSelectedDuration}
            adTitle={adTitle}
            setAdTitle={setAdTitle}
            adDescription={adDescription}
            setAdDescription={setAdDescription}
            audioVolume={audioVolume}
            isMuted={isMuted}
            handleVolumeChange={handleVolumeChange}
            toggleMute={toggleMute}
            scenes={scenes}
            dispatch={dispatch}
            backgroundColor={backgroundColor}
            // @ts-ignore
            setBackgroundColor={setBackgroundColor}
          />
        )
      default:
        return (
          <div className="p-8 text-[#bdc2c9] overflow-hidden">
            <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-[#e7dfd6] to-[#bdc2c9] bg-clip-text text-transparent">Welcome Back!</h2>
            <p className="mb-6 text-[#86868b] leading-relaxed">Create stunning video ads from your screenshots in minutes.</p>
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-gradient-to-b from-black/40 to-black/20 border border-white/10 backdrop-blur-sm shadow-lg">
                <h3 className="font-medium bg-gradient-to-r from-[#e7dfd6] to-[#bdc2c9] bg-clip-text text-transparent mb-3">Quick Start</h3>
                <p className="text-sm text-[#86868b] leading-relaxed">Upload your screenshot and choose an animation style to begin.</p>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-b from-black/40 to-black/20 border border-white/10 backdrop-blur-sm shadow-lg">
                <h3 className="font-medium bg-gradient-to-r from-[#e7dfd6] to-[#bdc2c9] bg-clip-text text-transparent mb-3">Recent Projects</h3>
                <p className="text-sm text-[#86868b] leading-relaxed">No recent projects yet.</p>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <motion.div
      initial={false}
      animate={{ 
        width: isOpen ? '24rem' : '0',
        opacity: isOpen ? 1 : 0,
        x: isOpen ? 0 : -320
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`bg-black/90 backdrop-blur-2xl overflow-hidden fixed top-0 bottom-0 z-50 left-0 lg:relative ${className}
        border-r border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]`}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#86868b]/5 via-transparent to-[#e7dfd6]/5 opacity-30" />
      
      {/* Animated Glow Effect */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#bdc2c9]/10 to-transparent" />
      </motion.div>

      {/* Content Container */}
      <div className="relative w-96 h-full flex">
        {/* Navigation Menu */}
        <div className="w-16 h-full bg-black/60 border-r border-white/10 flex  flex-col items-center">
          {/* Top Menu Items */}
          <div className="py-6 p-3">
            {menuItems.map(item => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`p-3 rounded-xl mb-3 group transition-all duration-500 ease-out
                    ${activeTab === item.id ? 
                      'bg-gradient-to-r from-[#bdc2c9]/20 to-[#e7dfd6]/20 text-white shadow-lg shadow-black/20' : 
                      'text-[#86868b] hover:text-[#bdc2c9] hover:bg-white/5'
                    }`}
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
                </button>
              )
            })}
          </div>

          {/* Bottom Profile Items */}
          <div className="mt-auto mb-8 p-3">
            {profileItems.map(item => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  className="p-3 rounded-xl mb-3 group transition-all duration-500 ease-out text-[#86868b] hover:text-[#bdc2c9] hover:bg-white/5"
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
                </button>
              )
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 h-full overflow-y-auto custom-scrollbar">
          {renderContent()}
        </div>
      </div>
    </motion.div>
  )
}