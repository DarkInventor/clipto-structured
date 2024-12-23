// import React, { useState } from 'react'
// import { motion } from 'framer-motion'
// import { ChevronLeftIcon, ChevronRightIcon, HomeIcon, VideoIcon, TextAlignLeftIcon, PersonIcon, GearIcon, ExitIcon, BellIcon, TrashIcon } from '@radix-ui/react-icons'
// import TemplateList from './TemplateList'
// import ConfigurationPanel from './ConfigurationPanel'
// import { useAuth } from '@/hooks/useAuth'
// import { useRouter } from 'next/navigation'
// import { ChangelogDialog } from './changelog-dialog'
// import { Project, useProjects } from '@/hooks/useProjects'

// interface SidebarProps {
//   children?: React.ReactNode
//   className?: string
//   isOpen: boolean
//   onToggle: () => void
//   selectedTemplate: string
//   onSelectTemplate: (template: any) => void
//   selectedAspectRatio: {
//     name: string
//     value: string
//     width: number
//     height: number
//   }
//   setSelectedAspectRatio: React.Dispatch<React.SetStateAction<any>>
//   selectedDuration: number
//   setSelectedDuration: React.Dispatch<React.SetStateAction<number>>
//   adTitle: string
//   setAdTitle: React.Dispatch<React.SetStateAction<string>>
//   adDescription: string
//   setAdDescription: React.Dispatch<React.SetStateAction<string>>
//   audioVolume: number
//   isMuted: boolean
//   handleVolumeChange: (vol: number) => void
//   toggleMute: () => void
//   scenes: any[]
//   dispatch: (action: any) => void
//   backgroundColor: string
//   setBackgroundColor: (color: string) => void
// }

// export default function Sidebar({ 
//   className,
//   isOpen, 
//   onToggle,
//   selectedTemplate,
//   onSelectTemplate,
//   selectedAspectRatio,
//   setSelectedAspectRatio,
//   selectedDuration,
//   setSelectedDuration,
//   adTitle,
//   setAdTitle,
//   adDescription,
//   setAdDescription,
//   audioVolume,
//   isMuted,
//   handleVolumeChange,
//   toggleMute,
//   scenes,
//   dispatch,
//   backgroundColor,
//   setBackgroundColor,
// }: SidebarProps) {
//   const [activeTab, setActiveTab] = useState('home')
//   const [showChangelog, setShowChangelog] = useState(false)
//   const { signOut } = useAuth()
//   const router = useRouter()
//   const { projects, deleteProject, loading } = useProjects()

//   const menuItems = [
//     { id: 'home', label: 'Home', icon: HomeIcon },
//     { id: 'animations', label: 'Animation Styles', icon: VideoIcon },
//     { id: 'brand', label: 'Brand & Audio', icon: TextAlignLeftIcon },
//   ]

//   const profileItems = [
//     { id: 'profile', label: 'Profile', icon: PersonIcon, onClick: () => router.push('/profile') },
//     { id: 'changelog', label: 'Changelog', icon: BellIcon, onClick: () => setShowChangelog(true) },
//     { id: 'logout', label: 'Logout', icon: ExitIcon, onClick: signOut },
//   ]

//   const handleDeleteProject = async (projectId: string) => {
//     if (window.confirm('Are you sure you want to delete this project?')) {
//       try {
//         await deleteProject(projectId)
//       } catch (error) {
//         console.error('Failed to delete project:', error)
//         // Optionally, show an error message to the user
//       }
//     }
//   }

//   const renderContent = () => {
//     switch(activeTab) {
//       case 'animations':
//         return (
//           <TemplateList
//             selectedTemplate={selectedTemplate}
//             onSelectTemplate={onSelectTemplate}
//           />
//         )
//       case 'brand':
//         return (
//           <ConfigurationPanel
//             selectedAspectRatio={selectedAspectRatio}
//             setSelectedAspectRatio={setSelectedAspectRatio}
//             selectedDuration={selectedDuration}
//             setSelectedDuration={setSelectedDuration}
//             adTitle={adTitle}
//             setAdTitle={setAdTitle}
//             adDescription={adDescription}
//             setAdDescription={setAdDescription}
//             audioVolume={audioVolume}
//             isMuted={isMuted}
//             handleVolumeChange={handleVolumeChange}
//             toggleMute={toggleMute}
//             scenes={scenes}
//             dispatch={dispatch}
//             backgroundColor={backgroundColor}
//             // @ts-ignore
//             setBackgroundColor={setBackgroundColor}
//           />
//         )
//       default:
//         return (
//           <div className="p-8 text-[#bdc2c9] overflow-hidden">
//             <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-[#e7dfd6] to-[#bdc2c9] bg-clip-text text-transparent">
//               Welcome Back!
//             </h2>
//             <p className="mb-6 text-[#86868b] leading-relaxed">
//               Create stunning video ads from your screenshots in minutes.
//             </p>
//             <div className="space-y-6">
//               <div className="p-6 rounded-xl bg-gradient-to-b from-black/40 to-black/20 border border-white/10 backdrop-blur-sm shadow-lg">
//                 <h3 className="font-medium bg-gradient-to-r from-[#e7dfd6] to-[#bdc2c9] bg-clip-text text-transparent mb-3">
//                   Quick Start
//                 </h3>
//                 <p className="text-sm text-[#86868b] leading-relaxed">
//                   Upload your screenshot and choose an animation style to begin.
//                 </p>
//               </div>
//               <div className="p-0 rounded-xl bg-gradient-to-b from-black/40 to-black/20 backdrop-blur-sm shadow-lg">
//                 <h3 className="font-medium bg-gradient-to-r from-[#e7dfd6] to-[#bdc2c9] bg-clip-text text-transparent mb-3">
//                   Recent Projects
//                 </h3>
//                 {loading ? (
//                   <p className="text-sm text-[#86868b] leading-relaxed">Loading projects...</p>
//                 ) : projects.length > 0 ? (
//                   <div className="space-y-4">
//                     {projects.map((project) => (
//                       <div
//                         key={project.id}
//                         className="p-4 rounded-lg bg-black/20 border border-white/10 hover:border-white/10 transition-colors"
//                       >
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <h4 className="text-white font-medium mb-1">{project.title}</h4>
//                             <p className="text-sm text-[#86868b] mb-2">{project.description}</p>
//                             <div className="flex justify-between items-center text-xs text-[#86868b]">
//                               <span>{project.templateName}</span>
//                               <span>{new Date(project.createdAt.toDate()).toLocaleDateString()}</span>
//                             </div>
//                           </div>
//                           <button
//                           // @ts-ignore
//                             onClick={() => handleDeleteProject(project.id)}
//                             className="text-red-500 hover:text-red-400 transition-colors"
//                             title="Delete project"
//                           >
//                             <TrashIcon className="w-4 h-4" />
//                           </button>
//                         </div>
//                         {project.renderedVideoUrl && (
//                           <a
//                             href={project.renderedVideoUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="mt-2 inline-block text-sm text-blue-400 hover:text-blue-300"
//                           >
//                             View Video
//                           </a>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-sm text-[#86868b] leading-relaxed">No recent projects yet.</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )
//     }
//   }

//   return (
//     <>
//       <motion.div
//         initial={false}
//         animate={{
//           width: isOpen ? '24rem' : '0',
//           opacity: isOpen ? 1 : 0,
//           x: isOpen ? 0 : -320
//         }}
//         transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//         className={`bg-black/90 backdrop-blur-2xl overflow-hidden fixed top-0 bottom-0 z-50 left-0 lg:relative ${className}
//           border-r border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]`}
//       >
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-b from-[#86868b]/5 via-transparent to-[#e7dfd6]/5 opacity-30" />

//         {/* Animated Glow Effect */}
//         <motion.div
//           className="absolute inset-0"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: [0.1, 0.2, 0.1] }}
//           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-tr from-[#bdc2c9]/10 to-transparent" />
//         </motion.div>

//         {/* Content Container */}
//         <div className="relative w-96 h-full flex">
//           {/* Navigation Menu */}
//           <div className="w-16 h-full bg-black/60 border-r border-white/10 flex flex-col items-center">
//             {/* Top Menu Items */}
//             <div className="py-6 p-3">
//               {menuItems.map(item => {
//                 const Icon = item.icon
//                 return (
//                   <button
//                     key={item.id}
//                     onClick={() => setActiveTab(item.id)}
//                     className={`p-3 rounded-xl mb-3 group transition-all duration-500 ease-out
//                       ${activeTab === item.id ?
//                         'bg-gradient-to-r from-[#bdc2c9]/20 to-[#e7dfd6]/20 text-white shadow-lg shadow-black/20' :
//                         'text-[#86868b] hover:text-[#bdc2c9] hover:bg-white/5'}`}
//                   >
//                     <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
//                   </button>
//                 )
//               })}
//             </div>

//             {/* Bottom Profile Items */}
//             <div className="mt-auto mb-8 p-3">
//               {profileItems.map(item => {
//                 const Icon = item.icon
//                 return (
//                   <button
//                     key={item.id}
//                     onClick={item.onClick}
//                     className="p-3 rounded-xl mb-3 group transition-all duration-500 ease-out text-[#86868b] hover:text-[#bdc2c9] hover:bg-white/5"
//                   >
//                     <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
//                   </button>
//                 )
//               })}
//             </div>
//           </div>

//           {/* Content Area */}
//           <div className="flex-1 h-full overflow-y-auto custom-scrollbar">
//             {renderContent()}
//           </div>
//         </div>
//       </motion.div>
//       <ChangelogDialog
//         open={showChangelog}
//         onOpenChange={setShowChangelog}
//       />
//     </>
//   )
// }





import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon, HomeIcon, VideoIcon, TextAlignLeftIcon, PersonIcon, GearIcon, ExitIcon, BellIcon, TrashIcon } from '@radix-ui/react-icons'
import TemplateList from './TemplateList'
import ConfigurationPanel from './ConfigurationPanel'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { ChangelogDialog } from './changelog-dialog'
import { Project, useProjects } from '@/hooks/useProjects'
import CreditsPopup from '@/components/credits-popup'
import { useCredits } from '@/hooks/useCredits'
import { CreditCard } from 'lucide-react'
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
  backgroundColor: string
  setBackgroundColor: (color: string) => void
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
  const [showChangelog, setShowChangelog] = useState(false)
  const { signOut } = useAuth()
  const router = useRouter()
  const { projects, deleteProject, loading } = useProjects()
  const { credits, loading: creditsLoading, error: creditsError } = useCredits()
  const [showCreditsPopup, setShowCreditsPopup] = useState(false)

  const menuItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'animations', label: 'Animation Styles', icon: VideoIcon },
    { id: 'brand', label: 'Brand & Audio', icon: TextAlignLeftIcon },
  ]

  const profileItems = [
    { id: 'credits', label: 'Credits', icon: CreditCard, onClick: () => setShowCreditsPopup(true) },
    { id: 'profile', label: 'Profile', icon: PersonIcon, onClick: () => router.push('/profile') },
    { id: 'changelog', label: 'Changelog', icon: BellIcon, onClick: () => setShowChangelog(true) },
    { id: 'logout', label: 'Logout', icon: ExitIcon, onClick: signOut },
   
  ]

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId)
      } catch (error) {
        console.error('Failed to delete project:', error)
        // Optionally, show an error message to the user
      }
    }
  }

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
            <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-[#e7dfd6] to-[#bdc2c9] bg-clip-text text-transparent">
              Welcome Back!
            </h2>
            <p className="mb-6 text-[#86868b] leading-relaxed">
              Create stunning video ads from your screenshots in minutes.
            </p>
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-gradient-to-b from-black/40 to-black/20 border border-white/10 backdrop-blur-sm shadow-lg">
                <h3 className="font-medium bg-gradient-to-r from-[#e7dfd6] to-[#bdc2c9] bg-clip-text text-transparent mb-3">
                  Quick Start
                </h3>
                <p className="text-sm text-[#86868b] leading-relaxed">
                  Upload your screenshot and choose an animation style to begin.
                </p>
              </div>
              <div className="p-0 rounded-xl bg-gradient-to-b from-black/40 to-black/20 backdrop-blur-sm shadow-lg">
                <h3 className="font-medium bg-gradient-to-r from-[#e7dfd6] to-[#bdc2c9] bg-clip-text text-transparent mb-3">
                  Recent Projects
                </h3>
                {loading ? (
                  <p className="text-sm text-[#86868b] leading-relaxed">Loading projects...</p>
                ) : projects.length > 0 ? (
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="p-4 rounded-lg bg-black/20 border border-white/10 hover:border-white/10 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-white font-medium mb-1">{project.title}</h4>
                            <p className="text-sm text-[#86868b] mb-2">{project.description}</p>
                            <div className="flex justify-between items-center text-xs text-[#86868b]">
                              <span>{project.templateName}</span>
                              <span>{new Date(project.createdAt.toDate()).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <button
                          // @ts-ignore
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-red-500 hover:text-red-400 transition-colors"
                            title="Delete project"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                        {project.renderedVideoUrl && (
                          <a
                            href={project.renderedVideoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-block text-sm text-blue-400 hover:text-blue-300"
                          >
                            View Video
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#86868b] leading-relaxed">No recent projects yet.</p>
                )}
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <>
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
          <div className="w-16 h-full bg-black/60 border-r border-white/10 flex flex-col items-center">
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
                        'text-[#86868b] hover:text-[#bdc2c9] hover:bg-white/5'}`}
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

      <AnimatePresence>
        {showCreditsPopup && (
          <CreditsPopup
            credits={credits}
            loading={creditsLoading}
            error={creditsError}
            onClose={() => setShowCreditsPopup(false)}
          />
        )}
      </AnimatePresence>
      <ChangelogDialog
        open={showChangelog}
        onOpenChange={setShowChangelog}
      />
    </>
  )
}




