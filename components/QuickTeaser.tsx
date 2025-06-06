import React, { useMemo } from 'react'
import { AbsoluteFill, interpolate, Img, Video } from 'remotion'

interface QuickTeaserProps {
  media: string;
  isVideo: boolean;
  volume: number;
  title: string;
  subtitle: string;
  zoom: number;
  rotation: number;
  backgroundColor: string;
  durationInFrames: number;
  frame: number;
  loopCount: number;
}

export const QuickTeaser: React.FC<QuickTeaserProps> = ({
  media,
  isVideo,
  volume,
  title,
  subtitle,
  zoom,
  rotation,
  backgroundColor,
  durationInFrames,
  frame,
  loopCount,
}) => {
  const keyframes = useMemo(() => ({
    0: { rotateX: 8, rotateY: 20, rotate: -5, scale: 2, translateX: 420, translateY: 400 },
    30: { rotateX: 8, rotateY: 20, rotate: -5, scale: 2, translateX: 450, translateY: 150 },
    31: { rotateX: 0, rotateY: -20, rotate: 0, scale: 1.8, translateX: 10, translateY: 150 },
    90: { rotateX: 0, rotateY: -20, rotate: 0, scale: 1.8, translateX: 10, translateY: -170 },
    91: { rotateX: 0, rotateY: 0, rotate: 0, scale: 1.1, translateX: 0, translateY: 60 },
    180: { rotateX: 0, rotateY: 0, rotate: 0, scale: 1, translateX: 0, translateY: 40 },
  }), [])

  const currentFromKeyframe = useMemo(() => {
    const keyframeValues = Object.values(keyframes)
    const keyframeFrames = Object.keys(keyframes).map(Number)
    const [currentBaseFrameIndex, currentBaseFrame] = keyframeFrames.reduce(
      ([lastIndex, makeshiftCurrentFrame], toBeCheckedFrame, index) =>
        toBeCheckedFrame <= frame ? [index, toBeCheckedFrame] : [lastIndex, makeshiftCurrentFrame],
      [0, 0]
    )
    
    if (!keyframeValues[currentBaseFrameIndex + 1]) return keyframeValues[currentBaseFrameIndex]
    
    const nextKeyframe = keyframeValues[currentBaseFrameIndex + 1]
    const currentKeyframe = keyframeValues[currentBaseFrameIndex]
    
    return {
      rotateX: interpolate(frame, [currentBaseFrame, keyframeFrames[currentBaseFrameIndex + 1]], [currentKeyframe.rotateX, nextKeyframe.rotateX]),
      rotateY: interpolate(frame, [currentBaseFrame, keyframeFrames[currentBaseFrameIndex + 1]], [currentKeyframe.rotateY, nextKeyframe.rotateY]),
      rotate: interpolate(frame, [currentBaseFrame, keyframeFrames[currentBaseFrameIndex + 1]], [currentKeyframe.rotate, nextKeyframe.rotate]),
      scale: interpolate(frame, [currentBaseFrame, keyframeFrames[currentBaseFrameIndex + 1]], [currentKeyframe.scale, nextKeyframe.scale]),
      translateX: interpolate(frame, [currentBaseFrame, keyframeFrames[currentBaseFrameIndex + 1]], [currentKeyframe.translateX, nextKeyframe.translateX]),
      translateY: interpolate(frame, [currentBaseFrame, keyframeFrames[currentBaseFrameIndex + 1]], [currentKeyframe.translateY, nextKeyframe.translateY]),
    }
  }, [frame, keyframes])

  return (
    <AbsoluteFill style={{ backgroundColor, alignItems: "center", justifyContent: "center", perspective: "1200px" }}>
      <AbsoluteFill style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "2px 2px 20px 5px rgba(0, 0, 0, .2)",
        transform: `
          scale(${currentFromKeyframe.scale * (zoom / 100)})
          translateX(${currentFromKeyframe.translateX}px)
          translateY(${currentFromKeyframe.translateY}px)
          rotateX(${currentFromKeyframe.rotateX}deg)
          rotateY(${currentFromKeyframe.rotateY}deg)
          rotate(${currentFromKeyframe.rotate + rotation}deg)
        `,
        width: "max-content", height: "max-content", margin: "auto", maxWidth: "1400px",
        borderRadius: "30px", overflow: "hidden",
        backgroundColor,
      }}>
        {isVideo ? (
          <Video src={media} style={{ width: "100%", height: "100%", minWidth: "1400px", backgroundColor }} volume={volume} />
        ) : (
          <Img src={media} style={{ width: "100%", height: "100%", minWidth: "1400px", objectFit: "cover", backgroundColor }} />
        )}
      </AbsoluteFill>
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

