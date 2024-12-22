import React, { useMemo } from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, Img, Video } from 'remotion'

interface LaptopProps {
  media: string;
  isVideo: boolean;
  volume: number;
  title: string;
  subtitle: string;
  zoom: number;
  rotation: number;
  backgroundColor: string;
}

export const Laptop: React.FC<LaptopProps> = ({
  media,
  isVideo,
  volume,
  title,
  subtitle,
  zoom,
  rotation,
  backgroundColor,
}) => {
  const frame = useCurrentFrame()

  const laptopKeyframes = useMemo(() => ({
    0: { scale: 0.8, rotateX: 20, rotateY: -20, translateY: 100 },
    60: { scale: 1, rotateX: 0, rotateY: 0, translateY: 0 },
    240: { scale: 1, rotateX: 0, rotateY: 0, translateY: 0 },
    300: { scale: 0.9, rotateX: 10, rotateY: 10, translateY: 50 },
  }), [])

  const currentLaptopKeyframe = useMemo(() => {
   
    return Object.keys(laptopKeyframes).reduce((acc, key) => {
       // @ts-ignore
      const keyframe = laptopKeyframes[key as keyof typeof laptopKeyframes]
      return {
        scale: interpolate(frame, [0, 300], [acc.scale, keyframe.scale], { extrapolateRight: 'clamp' }),
        rotateX: interpolate(frame, [0, 300], [acc.rotateX, keyframe.rotateX], { extrapolateRight: 'clamp' }),
        rotateY: interpolate(frame, [0, 300], [acc.rotateY, keyframe.rotateY], { extrapolateRight: 'clamp' }),
        translateY: interpolate(frame, [0, 300], [acc.translateY, keyframe.translateY], { extrapolateRight: 'clamp' }),
      }
    }, laptopKeyframes[0])
  }, [frame, laptopKeyframes])

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: `translate(-50%, -50%) scale(${currentLaptopKeyframe.scale * (zoom / 100)}) rotateX(${currentLaptopKeyframe.rotateX}deg) rotateY(${currentLaptopKeyframe.rotateY + rotation}deg) translateY(${currentLaptopKeyframe.translateY}px)`,
        width: '80%', height: '80%', perspective: '1000px',
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor,
          borderRadius: '15px',
          overflow: 'hidden',
          boxShadow: '0 0 20px rgba(0,0,0,0.3)',
        }}>
          {isVideo ? (
            <Video src={media} style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor }} volume={volume} />
          ) : (
            <Img src={media} style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor }} />
          )}
        </div>
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
