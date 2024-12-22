"use client"

import { useState } from 'react'

interface RenderProps {
  composition: string;
  inputProps: {
    scenes: Array<{
      duration: number;
      zoom: number;
      rotation: number;
      text: string;
    }>;
    fileUrl: string;
    isVideo: boolean;
    presentationType: string;
    audioVolume: number;
    adTitle: string;
    adDescription: string;
    backgroundColor: string; 
  };
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
  
}

export const useAWSLambda = () => {
  const [isRendering, setIsRendering] = useState(false)
  const [renderProgress, setRenderProgress] = useState(0)
  const [renderedVideoUrl, setRenderedVideoUrl] = useState<string | null>(null)

  const renderVideo = async (props: RenderProps) => {
    try {
      setIsRendering(true)
      setRenderProgress(0)
      setRenderedVideoUrl(null)

      console.log('Starting render with clean props:', {
        scenes: props.inputProps.scenes,
        isVideo: props.inputProps.isVideo,
        presentationType: props.inputProps.presentationType,
        audioVolume: props.inputProps.audioVolume,
        adTitle: props.inputProps.adTitle,
        adDescription: props.inputProps.adDescription,
        backgroundColor: props.inputProps.backgroundColor, // Add this line
      });

      const response = await fetch('/api/render-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(props),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const { renderId } = await response.json();
      console.log('Render started with ID:', renderId);

      // Start polling for progress
      const pollProgress = async () => {
        try {
          const progressResponse = await fetch(`/api/render-progress?renderId=${renderId}`);
          
          if (!progressResponse.ok) {
            const error = await progressResponse.json();
            throw new Error(error.message);
          }

          const progress = await progressResponse.json();
          console.log('Progress update:', progress);

          if (progress.done) {
            setIsRendering(false);
            setRenderProgress(1);
            setRenderedVideoUrl(progress.outputUrl);
            return;
          }

          if (progress.fatalErrorEncountered) {
            throw new Error(progress.errors?.[0]?.message || 'Rendering failed');
          }

          setRenderProgress(progress.overallProgress || 0);
          setTimeout(pollProgress, 1000);
        } catch (error) {
          console.error('Error checking render progress:', error);
          setIsRendering(false);
          setRenderProgress(0);
          throw error;
        }
      };

      await pollProgress();
    } catch (error) {
      console.error('Error rendering video:', error);
      setIsRendering(false);
      setRenderProgress(0);
      throw error;
    }
  };

  return {
    isRendering,
    renderProgress,
    renderedVideoUrl,
    renderVideo,
  };
};