import React from 'react'
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

  const scale = interpolate(frame, [0, 30], [0.8, 1]) * (zoom / 100)
  const rotate = interpolate(frame, [0, 60], [0, rotation])

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`,
        width: '80%', height: '60%', perspective: '1000px',
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
