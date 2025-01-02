import React, { useState, useRef, useReducer, useCallback, useEffect } from 'react';
import { Player, PlayerRef } from "@remotion/player";
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import ConfigurationPanel from '@/components/ConfigurationPanel';
import Header from '@/components/Header';
import TemplateList from '@/components/TemplateList';
import { aspectRatios } from '@/constants';
import { useAudioSettings } from '@/hooks/useAudioSettings';
import { historyReducer, initialHistoryState } from '@/reducers/historyReducer';

import MediaUpload from './MediaUpload';
import Sidebar from '@/components/Sidebar';
import Composition from '@/components/Composition';

interface DashboardProps {
  onBackToHome: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onBackToHome }) => {
  console.log('Dashboard: Component rendered');
  

  // Template and Layout State
  const [selectedTemplate, setSelectedTemplate] = useState('Angled Presentation');
  const [presentationType, setPresentationType] = useState<'angled' | 'quickTeaser' | 'laptop' | 'dynamicShowcase'>('angled');
  const [selectedAspectRatio, setSelectedAspectRatio] = useState(aspectRatios[0]);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  
  // Content State
  const [adTitle, setAdTitle] = useState('My new Website');
  const [adDescription, setAdDescription] = useState('Releasing today!');
  const playerRef = useRef<PlayerRef>(null);
  const { audioVolume, isMuted, handleVolumeChange, toggleMute } = useAudioSettings();
  const [history, dispatch] = useReducer(historyReducer, initialHistoryState);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // Add this line
  // File State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);
  
  // Render State
  const [renderState, setRenderState] = useState({
    isRendering: false,
    progress: 0,
    renderId: null as string | null,
    renderedVideoUrl: null as string | null,
    error: null as string | null,
  });

  const { scenes } = history.present;

  // Logging current state for debugging
  console.log('Dashboard: Current state', {
    selectedTemplate,
    presentationType,
    selectedAspectRatio,
    adTitle,
    adDescription,
    audioVolume,
    isMuted,
    scenes,
    renderState,
    uploadedFileUrl,
    isVideo
  });

  const handleFileUpload = (file: File) => {
    console.log('Dashboard: File uploaded', file);
    setUploadedFile(file);
    setIsVideo(file.type.startsWith('video/'));
    const url = URL.createObjectURL(file);
    setUploadedFileUrl(url);
  };

  const handleTemplateSelect = (template: { title: string; effect: 'angled' | 'quickTeaser' | 'laptop' | 'dynamicShowcase' }) => {
    console.log('Dashboard: Template selected', template);
    setSelectedTemplate(template.title);
    setPresentationType(template.effect);
  };

  const hasContent = Boolean(uploadedFileUrl) && scenes.length > 0;

  const handleRender = useCallback(async () => {
    console.log('Dashboard: Render initiated');
    if (!hasContent) {
      console.log('Dashboard: Cannot render, no content');
      toast({
        title: "Cannot render",
        description: "Please add media and at least one scene before rendering.",
        variant: "destructive",
      });
      return;
    }

    setRenderState(prev => ({
      ...prev,
      isRendering: true,
      progress: 0,
      renderId: null,
      renderedVideoUrl: null,
      error: null
    }));

    try {
      const videoProps = {
        scenes: scenes.map(scene => ({
          duration: Number(scene.duration) || 30,
          zoom: Number(scene.zoom) || 100,
          rotation: Number(scene.rotation) || 0,
          text: typeof scene.text === 'string' ? scene.text : ''
        })),
        imagePath: uploadedFileUrl,
        isVideo,
        presentationType,
        audioVolume,
        adTitle,
        adDescription,
        backgroundColor,
      };

      console.log('Dashboard: Render props:', JSON.stringify(videoProps, null, 2));

      const response = await fetch('/api/render-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          composition: 'MyComposition',
          inputProps: videoProps,
          durationInFrames: Math.max(scenes.reduce((sum, scene) => sum + scene.duration * 30, 0), 30),
          fps: 30,
          width: selectedAspectRatio.width,
          height: selectedAspectRatio.height,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to start rendering');
      }

      const data = await response.json();
      console.log('Dashboard: Render response:', data);
      setRenderState(prev => ({ ...prev, renderId: data.renderId }));

    } catch (error) {
      console.error('Dashboard: Error in handleRender:', error);
      setRenderState(prev => ({
        ...prev,
        isRendering: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      }));
      toast({
        title: "Rendering failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred while rendering your video.",
        variant: "destructive",
      });
    }
  }, [scenes, uploadedFileUrl, isVideo, presentationType, audioVolume, adTitle, adDescription, selectedAspectRatio, hasContent]);

  const totalDuration = scenes.reduce((sum, scene) => sum + scene.duration * 30, 0);

  useEffect(() => {
    if (!renderState.isRendering || !renderState.renderId) return;

    let isMounted = true;
    let pollInterval: NodeJS.Timeout;

    const checkProgress = async () => {
      try {
        const response = await fetch(`/api/render-progress?renderId=${renderState.renderId}`);
        const data = await response.json();

        console.log('Progress data:', data);

        if (!isMounted) return;

        if (data.done) {
          setRenderState(prev => ({
            ...prev,
            isRendering: false,
            progress: 100,
            renderedVideoUrl: data.url
          }));
          toast({
            title: "Rendering complete",
            description: "Your video is ready for download!",
            variant: "default",
          });
        } else if (data.error) {
          throw new Error(data.error);
        } else {
          setRenderState(prev => ({
            ...prev,
            progress: Math.round((data.progress || 0) * 100)
          }));
          pollInterval = setTimeout(checkProgress, 1000);
        }
      } catch (error) {
        console.error('Error checking render progress:', error);
        if (isMounted) {
          setRenderState(prev => ({
            ...prev,
            isRendering: false,
            error: error instanceof Error ? error.message : 'An unexpected error occurred'
          }));
          toast({
            title: "Rendering failed",
            description: error instanceof Error ? error.message : "An unexpected error occurred while rendering your video.",
            variant: "destructive",
          });
        }
      }
    };

    checkProgress();

    return () => {
      isMounted = false;
      if (pollInterval) clearTimeout(pollInterval);
    };
  }, [renderState.isRendering, renderState.renderId]);

  return (
    <div className="flex flex-col h-screen lg:flex-row">
       {/* @ts-ignore */}
     <Sidebar
        isOpen={leftSidebarOpen}
        onToggle={() => setLeftSidebarOpen(!leftSidebarOpen)}
        // @ts-ignore
        selectedTemplate={selectedTemplate.title}
        onSelectTemplate={handleTemplateSelect}
        selectedAspectRatio={selectedAspectRatio}
        setSelectedAspectRatio={setSelectedAspectRatio}
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
      />

      <main className="flex-1 flex flex-col bg-white dark:bg-gray-900 overflow-hidden">
      {/* @ts-ignore */}
        <Header 
          selectedTemplate={selectedTemplate} 
          onRender={handleRender}
          isRenderDisabled={!hasContent}
        />
        <div className="flex-1 p-4 overflow-auto flex items-center justify-center">
          {uploadedFileUrl ? (
            <Player
              ref={playerRef}
                // @ts-ignore
              component={Composition}
              inputProps={{
                scenes,
                imagePath: uploadedFileUrl,
                isVideo,
                presentationType,
                audioVolume,
                adTitle,
                adDescription,
                backgroundColor, 
              }}
              durationInFrames={totalDuration || 300}
              compositionWidth={selectedAspectRatio.width}
              compositionHeight={selectedAspectRatio.height}
              fps={30}
              controls
              style={{
                width: '100%',
                height: '100%',
                maxWidth: `${selectedAspectRatio.width}px`,
                maxHeight: `${selectedAspectRatio.height}px`,
              }}
            />
          ) : (
            <MediaUpload onUpload={handleFileUpload} />
          )}
        </div>

        {renderState.isRendering && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="text-center mb-4">
                <p className="text-xl font-semibold">Rendering your video...</p>
                <p className="text-sm text-gray-500">Please wait, this may take a few seconds.</p>
              </div>
              <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300 ease-out"
                  style={{ width: `${renderState.progress}%` }}
                ></div>
              </div>
              <p className="text-center mt-2">{renderState.progress}%</p>
            </div>
          </div>
        )}

        {renderState.renderedVideoUrl && (
          <div className="absolute bottom-4 right-4">
            <a
              href={renderState.renderedVideoUrl}
              download
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Download Rendered Video
            </a>
          </div>
        )}

        {renderState.error && (
          <div className="absolute bottom-4 left-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {renderState.error}</span>
          </div>
        )}

        <div className="absolute top-4 left-4">
          <Button onClick={onBackToHome} variant="outline">
            Back to Home
          </Button>
        </div>
      </main>

    </div>
  );
};

export default Dashboard;







