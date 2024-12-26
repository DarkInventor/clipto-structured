// "use client"

// import React, { useState, useRef, useReducer, useEffect } from 'react'
// import { Player, PlayerRef } from "@remotion/player"
// import ConfigurationPanel from '@/components/ConfigurationPanel'
// import Header from '@/components/Header'
// import MediaUpload from '@/components/MediaUpload'
// import { aspectRatios, durationOptions } from '@/constants'
// import { useAudioSettings } from '@/hooks/useAudioSettings'
// import { useAWSLambda } from '@/hooks/useAWSLambda'
// import { useFileUpload } from '@/hooks/useFileUpload'
// import { historyReducer, initialHistoryState } from '@/reducers/historyReducer'
// import Sidebar from '@/components/Sidebar'
// import Composition from '@/components/Composition'
// import TemplateList from '@/components/TemplateList'
// import { motion } from 'framer-motion'
// import { useAuth } from '@/hooks/useAuth'

// export default function App() {
//   const { user, signOut } = useAuth()
//   // @ts-ignore
//   const [selectedTemplate, setSelectedTemplate] = useState<Template>({
//     title: 'Angled Presentation',
//     duration: '00:05',
//     effect: 'angled'
//   })
//   const [selectedAspectRatio, setSelectedAspectRatio] = useState(aspectRatios[0])
//   const [selectedDuration, setSelectedDuration] = useState(durationOptions[0].value)
//   const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
//   const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
//   const [adTitle, setAdTitle] = useState('My new Website')
//   const [adDescription, setAdDescription] = useState('Releasing today!')
//   const playerRef = useRef<PlayerRef>(null)
//   const [backgroundColor, setBackgroundColor] = useState('#000000');
//   const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

//   const { audioVolume, isMuted, handleVolumeChange, toggleMute } = useAudioSettings()
//   const { file, fileUrl, isVideo, handleFileChange, triggerFileInput, fileInputRef } = useFileUpload()
//   const [history, dispatch] = useReducer(historyReducer, initialHistoryState)
//   const { isRendering, renderProgress, renderedVideoUrl, renderVideo } = useAWSLambda()

//   if (!user) {
//     return <div>Loading...</div>
//   }

//   const scenes = history.present?.scenes || []
  
//   const handleRender = () => {
//     console.log('Rendering with props:', {
//       backgroundColor,
//       scenes,
//       fileUrl,
//       isVideo,
//       presentationType: selectedTemplate.effect,
//       audioVolume,
//       adTitle,
//       adDescription,
//     });
//     renderVideo({
//       composition: 'Clipto', 
//       inputProps: {
//         scenes,
//         // @ts-ignore
//         fileUrl,
//         isVideo,
//         presentationType: selectedTemplate.effect,
//         audioVolume,
//         adTitle,
//         adDescription,        
//         backgroundColor,
//       },
//       durationInFrames: selectedDuration * 60,
//       fps: 60,
//       width: selectedAspectRatio.width,
//       height: selectedAspectRatio.height,
//     });
//   };
//    // @ts-ignore
//   const handleTemplateSelect = (template: Template) => {
//     setSelectedTemplate(template)
//   }

//   const totalDuration = selectedDuration * 30;

//   return (
//     <div className="flex flex-col h-screen lg:flex-row bg-black">
//       <Sidebar
//         isOpen={leftSidebarOpen}
//         onToggle={() => setLeftSidebarOpen(!leftSidebarOpen)}
//         selectedTemplate={selectedTemplate.title}
//         onSelectTemplate={handleTemplateSelect}
//         selectedAspectRatio={selectedAspectRatio}
//         setSelectedAspectRatio={setSelectedAspectRatio}
//         selectedDuration={selectedDuration}
//         setSelectedDuration={setSelectedDuration}
//         adTitle={adTitle}
//         setAdTitle={setAdTitle}
//         adDescription={adDescription}
//         setAdDescription={setAdDescription}
//         audioVolume={audioVolume}
//         isMuted={isMuted}
//         handleVolumeChange={handleVolumeChange}
//         toggleMute={toggleMute}
//         scenes={scenes}
//         dispatch={dispatch}
//         backgroundColor={backgroundColor}
//         setBackgroundColor={setBackgroundColor}
//       />

//       <main className="flex-1 flex flex-col bg-black overflow-hidden px-4">
//         <Header 
//           selectedTemplate={selectedTemplate.title} 
//           onRender={handleRender} 
//           isRenderDisabled={isRendering || !fileUrl}
//           renderedVideoUrl={renderedVideoUrl}
//         />
//         <div className="flex-1 p-4 overflow-hidden flex items-center justify-center">
//           {fileUrl ? (
//               <Player
//               ref={playerRef}
//                 // @ts-ignore
//               component={Composition}
//               inputProps={{
//                 scenes,
//                 fileUrl,
//                 isVideo,
//                 presentationType: selectedTemplate.effect,
//                 audioVolume,
//                 adTitle,
//                 adDescription,
//                 backgroundColor,
//                 backgroundImage,
//               }}
//               durationInFrames={selectedDuration * 60}
//               compositionWidth={selectedAspectRatio.width}
//               compositionHeight={selectedAspectRatio.height}
//               fps={60}
//               controls
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 maxWidth: `${selectedAspectRatio.width}px`,
//                 maxHeight: `${selectedAspectRatio.height}px`,
//               }}
//               className='rounded-xl'
//             />
//           ) : (
//             <MediaUpload onUpload={triggerFileInput} />
//           )}
//         </div>
//         {isRendering && (
//           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-4 rounded-lg">
//               <p>Rendering... {Math.round(renderProgress * 100)}%</p>
//             </div>
//           </div>
//         )}
//         {renderedVideoUrl && (
//           <div className="absolute bottom-4 right-4">
//             <a
//               href={renderedVideoUrl}
//               download
//               className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
//             >
//               Download Rendered Video
//             </a>
//           </div>
//         )}
//       </main>

//       <input
//         type="file"
//         accept="image/*,video/*"
//         onChange={handleFileChange}
//         className="hidden"
//         ref={fileInputRef}
//       />
//     </div>
//   )
// }
















"use client"

import React, { useState, useRef, useReducer, useEffect } from 'react'
import { Player, PlayerRef } from "@remotion/player"
import ConfigurationPanel from '@/components/ConfigurationPanel'
import Header from '@/components/Header'
import MediaUpload from '@/components/MediaUpload'
import { aspectRatios, durationOptions } from '@/constants'
import { useAudioSettings } from '@/hooks/useAudioSettings'
import { useAWSLambda } from '@/hooks/useAWSLambda'
import { useFileUpload } from '@/hooks/useFileUpload'
import { historyReducer, initialHistoryState } from '@/reducers/historyReducer'
import Sidebar from '@/components/Sidebar'
import Composition from '@/components/Composition'
import TemplateList from '@/components/TemplateList'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { useProjects, Scene } from '@/hooks/useProjects'
import RecentProjects from '@/components/RecentProjects'
import { Button } from '@/components/ui/button'
import { DownloadIcon } from '@radix-ui/react-icons'

export default function App() {
  const { user, signOut } = useAuth()
  const { projects, saveProject, loading: projectsLoading } = useProjects()
  // @ts-ignore
  const [selectedTemplate, setSelectedTemplate] = useState<Template>({
    title: 'Quick Teaser',
    duration: '00:05',
    effect: 'quickTeaser'
  })
  const [selectedAspectRatio, setSelectedAspectRatio] = useState(aspectRatios[0])
  const [selectedDuration, setSelectedDuration] = useState(durationOptions[0].value)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [adTitle, setAdTitle] = useState('')
  const [adDescription, setAdDescription] = useState('')
  const playerRef = useRef<PlayerRef>(null)
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  const { audioVolume, isMuted, handleVolumeChange, toggleMute } = useAudioSettings()
  const { file, fileUrl, isVideo, handleFileChange, triggerFileInput, fileInputRef } = useFileUpload()
  const [history, dispatch] = useReducer(historyReducer, initialHistoryState)
  const { isRendering, renderProgress, renderedVideoUrl, renderVideo } = useAWSLambda()

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')

  if (!user) {
    return <div>Loading...</div>
  }

  const scenes = history.present?.scenes || []

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
  
  const handleRender = async () => {
    console.log('Starting render process...');
    console.log('Render props:', {
      backgroundColor,
      scenes,
      fileUrl,
      isVideo,
      presentationType: selectedTemplate.effect,
      audioVolume,
      adTitle,
      adDescription,
    });
  
    try {
      const result = await renderVideo({
        composition: 'Clipto', 
        inputProps: {
          scenes,
          // @ts-ignore
          fileUrl,
          isVideo,
          presentationType: selectedTemplate.effect,
          audioVolume,
          adTitle,
          adDescription,        
          backgroundColor,
        },
        durationInFrames: selectedDuration * 60,
        fps: 60,
        width: selectedAspectRatio.width,
        height: selectedAspectRatio.height,
      });
  
      console.log('Render result:', result);
  // @ts-ignore
      if (!result || !result.renderedVideoUrl) {
        console.error('Render completed but no renderedVideoUrl was returned');
      }
    } catch (renderError) {
      console.error('Error during render:', renderError);
    }
  };
  
  // @ts-ignore
  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template)
  }

  const totalDuration = selectedDuration * 30;

  return (
    <div className="flex flex-col h-screen lg:flex-row bg-black">
      <Sidebar
        isOpen={leftSidebarOpen}
        onToggle={() => setLeftSidebarOpen(!leftSidebarOpen)}
        selectedTemplate={selectedTemplate.title}
        onSelectTemplate={handleTemplateSelect}
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
        setBackgroundColor={setBackgroundColor}
        // @ts-ignore
        projects={projects}
      />

      <main className="flex-1 flex flex-col bg-black overflow-hidden px-4">
        <Header 
          selectedTemplate={selectedTemplate.title} 
          onRender={handleRender} 
          isRenderDisabled={isRendering || !fileUrl}
          renderedVideoUrl={renderedVideoUrl}
        />
        <div className="flex-1 p-4 overflow-hidden flex items-center justify-center">
          {fileUrl ? (
              <Player
              ref={playerRef}
              // @ts-ignore
              component={Composition}
              inputProps={{
                scenes,
                fileUrl,
                isVideo,
                presentationType: selectedTemplate.effect,
                audioVolume,
                adTitle,
                adDescription,
                backgroundColor,
                backgroundImage,
              }}
              durationInFrames={selectedDuration * 60}
              compositionWidth={selectedAspectRatio.width}
              compositionHeight={selectedAspectRatio.height}
              fps={60}
              controls
              style={{
                width: '100%',
                height: '100%',
                maxWidth: `${selectedAspectRatio.width}px`,
                maxHeight: `${selectedAspectRatio.height}px`,
              }}
              className='rounded-xl'
            />
          ) : (
            <MediaUpload onUpload={triggerFileInput} />
          )}
        </div>
        {isRendering && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              <p>Rendering... {Math.round(renderProgress * 100)}%</p>
            </div>
          </div>
        )}
        {renderedVideoUrl && (
          <div className="absolute bottom-4 right-4 flex gap-2">
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
            <button
              onClick={async () => {
                setSaveStatus('saving');
                try {
                  await saveProject({
                    title: adTitle,
                    description: adDescription,
                    templateName: selectedTemplate.title,
                    templateEffect: selectedTemplate.effect,
                    aspectRatio: {
                      width: selectedAspectRatio.width,
                      height: selectedAspectRatio.height,
                      name: selectedAspectRatio.name,
                    },
                    duration: selectedDuration,
                    backgroundColor,
                    // @ts-ignore
                    fileUrl,
                    renderedVideoUrl,
                    // @ts-ignore
                    scenes: scenes.map((scene: Scene) => ({
                      id: scene.id,
                      mediaItem: {
                        fileUrl: scene.mediaItem.fileUrl,
                        isVideo: scene.mediaItem.isVideo,
                        duration: scene.mediaItem.duration,
                        order: scene.mediaItem.order,
                      },
                      transitions: scene.transitions,
                    })),
                  });
                  console.log('Project saved successfully');
                  setSaveStatus('success');
                } catch (error) {
                  console.error('Error saving project:', error);
                  setSaveStatus('error');
                }
              }}
              className={`px-4 py-2 rounded-md ${
                saveStatus === 'saving' 
                  ? 'bg-yellow-500 cursor-not-allowed' 
                  : saveStatus === 'success'
                  ? 'bg-green-500 hover:bg-green-600'
                  : saveStatus === 'error'
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
              disabled={saveStatus === 'saving'}
            >
              {saveStatus === 'saving' 
                ? 'Saving...' 
                : saveStatus === 'success'
                ? 'Saved!'
                : saveStatus === 'error'
                ? 'Save Failed'
                : 'Save Project'}
            </button>
          </div>
        )}
        {/* @ts-ignore */}
        <RecentProjects projects={projects} loading={projectsLoading} />
      </main>

      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
    </div>
  )
}

