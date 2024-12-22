import React, { useMemo } from 'react'
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Img, Video } from 'remotion'

interface AngledPresentationProps {
  media: string;
  isVideo: boolean;
  volume: number;
  title: string;
  subtitle: string;
  zoom: number;
  rotation: number;
  duration: number;
  backgroundColor: string;
}

export const AngledPresentation: React.FC<AngledPresentationProps> = ({
  media,
  isVideo,
  volume,
  title,
  subtitle,
  zoom,
  rotation,
  duration,
  backgroundColor
}) => {
  const frame = useCurrentFrame()
  const { durationInFrames, fps } = useVideoConfig()
  
  const keyframes = useMemo(() => {
    // Ensure we have a valid duration
    const safeDuration = Math.max(1, duration || 10)
    const scaleFactor = safeDuration / 10
    
    // Ensure all frame numbers are integers and scale based on total duration
    return {
      0: { z: 330, rotateY: -20, rotateX: 15, rotate: -7, scale: 1 },
      [Math.floor(30 * scaleFactor)]: { z: 0, rotateY: 0, rotateX: 0, rotate: 0, scale: 1.2 },
      [Math.floor(80 * scaleFactor)]: { z: 330, rotateY: 20, rotateX: 15, rotate: 7, scale: 1 },
      [Math.floor(150 * scaleFactor)]: { z: 0, rotateY: 0, rotateX: 0, rotate: 0, scale: 1.2 },
    }
  }, [duration])

  const currentFromKeyframe = useMemo(() => {
    const keyframeValues = Object.values(keyframes)
    const keyframeFrames = Object.keys(keyframes).map(Number)
    
    // Find the current keyframe index
    const currentIndex = keyframeFrames.findIndex(f => f > frame % durationInFrames) - 1
    const safeIndex = Math.max(0, currentIndex)
    
    // If we're at the last keyframe, return it
    if (safeIndex === keyframeFrames.length - 1) {
      return keyframeValues[safeIndex]
    }
    
    const currentFrame = keyframeFrames[safeIndex]
    const nextFrame = keyframeFrames[safeIndex + 1]
    const currentKeyframe = keyframeValues[safeIndex]
    const nextKeyframe = keyframeValues[safeIndex + 1]
    
    return {
      z: interpolate(frame % durationInFrames, [currentFrame, nextFrame], [currentKeyframe.z, nextKeyframe.z]),
      rotateY: interpolate(frame % durationInFrames, [currentFrame, nextFrame], [currentKeyframe.rotateY, nextKeyframe.rotateY]),
      rotateX: interpolate(frame % durationInFrames, [currentFrame, nextFrame], [currentKeyframe.rotateX, nextKeyframe.rotateX]),
      rotate: interpolate(frame % durationInFrames, [currentFrame, nextFrame], [currentKeyframe.rotate, nextKeyframe.rotate]),
      scale: interpolate(frame % durationInFrames, [currentFrame, nextFrame], [currentKeyframe.scale, nextKeyframe.scale]),
    }
  }, [frame, durationInFrames, keyframes])

  // Rest of the component remains the same...
  return (
    // <AbsoluteFill style={{ backgroundColor: backgroundColor || "#fff", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <AbsoluteFill style={{ 
      backgroundColor, 
      // backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
      <div style={{
        width: "80%",
        height: "80%",
        backgroundColor: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 0 50px rgba(0, 0, 0, 0.3)",
        perspective: "1000px",
        transform: `
          translateZ(${currentFromKeyframe.z}px)
          rotateY(${currentFromKeyframe.rotateY + rotation}deg)
          rotateX(${currentFromKeyframe.rotateX}deg)
          rotate(${currentFromKeyframe.rotate}deg)
          scale(${currentFromKeyframe.scale * (zoom / 100)})
        `,
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '20px',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '10px'
        }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f57', marginRight: '5px' }}></div>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e', marginRight: '5px' }}></div>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28c940' }}></div>
        </div>
        {isVideo ? (
          <Video src={media} style={{ width: '100%', height: '100%', objectFit: 'cover' }} volume={volume} />
        ) : (
          <Img src={media} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
      </div>
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '10%',
        right: '10%',
        textAlign: 'center',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
      }}>
        <h1 style={{ fontSize: '3em', marginBottom: '0.5em' }}>{title}</h1>
        <h2 style={{ fontSize: '1.5em' }}>{subtitle}</h2>
      </div>
    </AbsoluteFill>
  )
}

