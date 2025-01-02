// import React, { useEffect } from 'react'
// import { motion } from 'framer-motion'
// import { PlayIcon, DownloadIcon } from '@radix-ui/react-icons'

// interface HeaderProps {
//   selectedTemplate: string
//   onRender: () => void
//   isRenderDisabled: boolean
//   renderedVideoUrl: string | null
// }

// export default function Header({ 
//   selectedTemplate, 
//   onRender, 
//   isRenderDisabled,
//   renderedVideoUrl 
// }: HeaderProps) {
//   // Add debug logs
//   useEffect(() => {
//     console.log('Header renderedVideoUrl:', renderedVideoUrl);
//   }, [renderedVideoUrl]);

//   const handleDownload = async () => {
//     if (!renderedVideoUrl) return;
//     console.log('Downloading video from URL:', renderedVideoUrl);

//     try {
//       const response = await fetch(renderedVideoUrl);
//       const blob = await response.blob();
//       const downloadUrl = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = downloadUrl;
//       link.download = `clipto-video-${Date.now()}.mp4`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(downloadUrl);
//     } catch (error) {
//       console.error('Error downloading video:', error);
//       alert('Failed to download video. Please try again.');
//     }
//   };

//   // Add debug log for rendering
//   console.log('Header rendering with renderedVideoUrl:', renderedVideoUrl);

//   return (
//     <header className="flex flex-col sm:flex-row items-center justify-between py-5 bg-black border-b border-white/5 px-4 overflow-hidden">
//       <h2 className="text-xl sm:text-xl font-semibold text-[#c8c2bd] leading-7 tracking-tight mb-2 sm:mb-0 font-[Poppins]">
//         {selectedTemplate}
//       </h2>
      
//       {renderedVideoUrl ? (
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleDownload}
//           className="text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6] bg-gradient-to-r from-[#86868b] to-[#bdc2c9] 
//             border-none px-6 py-2.5 rounded-full flex items-center transition-all duration-300 ease-in-out
//             shadow-[0_0_15px_rgba(189,194,201,0.3)] font-[Poppins] font-medium"
//         >
//           <DownloadIcon className="mr-2 h-4 w-4" />
//           Download Video
//         </motion.button>
//       ) : (
//         <motion.button
//           whileHover={{ scale: isRenderDisabled ? 1 : 1.05 }}
//           whileTap={{ scale: isRenderDisabled ? 1 : 0.95 }}
//           onClick={onRender}
//           className={`text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6] bg-gradient-to-r from-[#86868b] to-[#bdc2c9] 
//             border-none px-6 py-2.5 rounded-full flex items-center transition-all duration-300 ease-in-out
//             shadow-[0_0_15px_rgba(189,194,201,0.3)] font-[Poppins] font-medium
//             ${isRenderDisabled ? 'opacity-50 cursor-not-allowed hover:from-[#86868b] hover:to-[#bdc2c9]' : 
//             'hover:shadow-[0_0_25px_rgba(189,194,201,0.5)] transform hover:-translate-y-0.5'}`}
//           disabled={isRenderDisabled}
//         >
//           <PlayIcon className="mr-2 h-4 w-4" />
//           Render <span className="ml-2 text-sm hidden sm:inline opacity-75">⌘ + J</span>
//         </motion.button>
//       )}
//     </header>
//   )
// }





import { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc, updateDoc, addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore'
import { app } from '@/firebaseConfig' // Make sure this path is correct
import { motion } from 'framer-motion'
import { PlayIcon, DownloadIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RainbowButton } from './ui/rainbow-button'

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
  const [userCredits, setUserCredits] = useState<number | null>(null)
  const [isUpdatingCredits, setIsUpdatingCredits] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  useEffect(() => {
    const fetchUserCredits = async () => {
      const auth = getAuth(app)
      const user = auth.currentUser
      if (user) {
        const db = getFirestore(app)
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (userDoc.exists()) {
          setUserCredits(userDoc.data().credits)
        }
      }
    }
    fetchUserCredits()
  }, [])

  useEffect(() => {
    const saveProjectData = async () => {
      if (renderedVideoUrl) {
        const auth = getAuth(app);
        const user = auth.currentUser;
        if (!user) {
          console.error('User not authenticated');
          return;
        }

        try {
          const db = getFirestore(app);
          await addDoc(collection(db, 'projects'), {
            userId: user.uid,
            renderedUrl: renderedVideoUrl,
            template: selectedTemplate,
            createdAt: Timestamp.now(),
            // Add any other relevant data here
          });
          console.log('Project data saved successfully');
        } catch (error) {
          console.error('Error saving project data:', error);
        }
      }
    };

    saveProjectData();
  }, [renderedVideoUrl, selectedTemplate]);


  const handleDownload = async () => {
    if (!renderedVideoUrl) return;
    console.log('Downloading video from URL:', renderedVideoUrl);

    try {
      const response = await fetch(renderedVideoUrl);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `Animator-Studio-${Date.now()}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading video:', error);
      alert('Failed to download video. Please try again.');
    }
    
  };


  const updateUserCredits = async () => {
    if (isUpdatingCredits || userCredits === null || userCredits < 12) return

    setIsUpdatingCredits(true)
    const auth = getAuth(app)
    const user = auth.currentUser
    if (user) {
      const db = getFirestore(app)
      const userRef = doc(db, 'users', user.uid)
      try {
        await updateDoc(userRef, {
          credits: userCredits - 12
        })
        setUserCredits(prevCredits => (prevCredits !== null ? prevCredits - 12 : null))
        onRender() // Call the original onRender function
      } catch (error) {
        console.error('Error updating credits:', error)
        alert('Failed to update credits. Please try again.')
      } finally {
        setIsUpdatingCredits(false)
      }
    }
  }

  const handleRenderClick = () => {
    if (!isRenderDisabled && userCredits !== null && userCredits >= 12) {
      updateUserCredits()
    } else if (userCredits !== null && userCredits < 12) {
      setShowUpgradeModal(true)
    }
  }

  const handleUpgrade = () => {
    // Implement the upgrade logic here
    console.log('Upgrade plan');
    window.location.href = '/#pricing';
    setShowUpgradeModal(false)
  }

  return (
    <>
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
      ) 
        : (
          <motion.button
            whileHover={{ scale: isRenderDisabled || isUpdatingCredits || (userCredits !== null && userCredits < 12) ? 1 : 1.05 }}
            whileTap={{ scale: isRenderDisabled || isUpdatingCredits || (userCredits !== null && userCredits < 12) ? 1 : 0.95 }}
            onClick={handleRenderClick}
            className={`text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6] bg-gradient-to-r from-[#86868b] to-[#bdc2c9] 
              border-none px-6 py-2.5 rounded-full flex items-center transition-all duration-300 ease-in-out
              shadow-[0_0_15px_rgba(189,194,201,0.3)] font-[Poppins] font-medium
              ${(isRenderDisabled || isUpdatingCredits) ? 'opacity-50 cursor-not-allowed hover:from-[#86868b] hover:to-[#bdc2c9]' : 
              'hover:shadow-[0_0_25px_rgba(189,194,201,0.5)] transform hover:-translate-y-0.5'}`}
            disabled={isRenderDisabled || isUpdatingCredits}
          >
            <PlayIcon className="mr-2 h-4 w-4" />
            Render
          </motion.button>
        )}
        {/* {userCredits !== null && (
          <p className="text-sm text-[#c8c2bd] mt-2 sm:mt-0 sm:ml-4">Credits: {userCredits}</p>
        )} */}
      </header>

      {/* <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal} >
        <DialogContent   className=" z-50 flex flex-col items-center justify-center mx-auto bg-black bg-opacity-50 backdrop-blur-sm border-none">
          <DialogHeader>
            <DialogTitle className='text-white'>Insufficient Credits</DialogTitle>
            <DialogDescription className='text-white'>
              You don't have enough credits to render this video. Please upgrade your plan to continue.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='flex justify-left items-start'>
            <Button variant="outline" onClick={() => setShowUpgradeModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpgrade} className='outline'>Upgrade Plan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
        <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
      <DialogContent className="sm:max-w-[425px] bg-black border border-white/10 text-[#c8c2bd] p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold leading-[1.0625] tracking-[-0.009em] bg-gradient-to-b from-[#dfe5ee] to-[#fffaf6] bg-clip-text text-transparent">
            Insufficient Credits
          </DialogTitle>
          <DialogDescription className="text-[#86868b] mt-2">
            You don't have enough credits to render this video. Upgrade your plan to continue creating beautiful animations.
          </DialogDescription>
        </DialogHeader>
        <div className="my-6">
          <p className="text-sm text-[#86868b]">
            Upgrade now to unlock:
          </p>
          <ul className="mt-2 space-y-2">
            <li className="flex items-center text-sm">
              <ArrowRightIcon className="mr-2 h-4 w-4 text-[#bdc2c9]" />
              <span>More Credits  </span>
            </li>
            <li className="flex items-center text-sm">
              <ArrowRightIcon className="mr-2 h-4 w-4 text-[#bdc2c9]" />
              <span>Render More Videos</span>
            </li>
            <li className="flex items-center text-sm">
              <ArrowRightIcon className="mr-2 h-4 w-4 text-[#bdc2c9]" />
              <span>Priority support</span>
            </li>
          </ul>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button
            // variant="outline"
            onClick={() => setShowUpgradeModal(false)}
            className="w-full sm:w-auto border-[#86868b] bg-gray-300 text-black hover:bg-[#86868b] hover:text-black transition-all duration-300"
          >
            Maybe Later
          </Button>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              onClick={handleUpgrade}
              className="w-full bg-white text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6] transition-all duration-300"
            
            >
              Upgrade Plan
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  )
}

