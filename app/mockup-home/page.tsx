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

export default function App() {
  const { user, signOut } = useAuth()
  // @ts-ignore
  const [selectedTemplate, setSelectedTemplate] = useState<Template>({
    title: 'Angled Presentation',
    duration: '00:05',
    effect: 'angled'
  })
  const [selectedAspectRatio, setSelectedAspectRatio] = useState(aspectRatios[0])
  const [selectedDuration, setSelectedDuration] = useState(durationOptions[0].value)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [adTitle, setAdTitle] = useState('My new Website')
  const [adDescription, setAdDescription] = useState('Releasing today!')
  const playerRef = useRef<PlayerRef>(null)
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  const { audioVolume, isMuted, handleVolumeChange, toggleMute } = useAudioSettings()
  const { file, fileUrl, isVideo, handleFileChange, triggerFileInput, fileInputRef } = useFileUpload()
  const [history, dispatch] = useReducer(historyReducer, initialHistoryState)
  const { isRendering, renderProgress, renderedVideoUrl, renderVideo } = useAWSLambda()

  if (!user) {
    return <div>Loading...</div>
  }

  const scenes = history.present?.scenes || []
  
  const handleRender = () => {
    console.log('Rendering with props:', {
      backgroundColor,
      scenes,
      fileUrl,
      isVideo,
      presentationType: selectedTemplate.effect,
      audioVolume,
      adTitle,
      adDescription,
    });
    renderVideo({
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
          <div className="absolute bottom-4 right-4">
            <a
              href={renderedVideoUrl}
              download
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Download Rendered Video
            </a>
          </div>
        )}
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