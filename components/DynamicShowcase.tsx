import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, Img, Video } from 'remotion'

interface DynamicShowcaseProps {
  media: string;
  isVideo: boolean;
  volume: number;
  title: string;
  subtitle: string;
  zoom: number;
  rotation: number;
  backgroundColor: string;
}

export const DynamicShowcase: React.FC<DynamicShowcaseProps> = ({
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
  const opacity = interpolate(frame, [0, 30], [0, 1])
  const scale = interpolate(frame, [0, 30], [0.8, 1]) * (zoom / 100)
  const rotate = interpolate(frame, [0, 60, 120], [0, rotation, 0])

  return (
    <AbsoluteFill style={{ backgroundColor, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        opacity,
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        width: '80%',
        height: '80%',
        overflow: 'hidden',
        borderRadius: '20px',
        boxShadow: '0 0 20px rgba(255,255,255,0.3)',
        backgroundColor,
      }}>
        {isVideo ? (
          <Video src={media} style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor }} volume={volume} />
        ) : (
          <Img src={media} style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor }} />
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
        opacity: interpolate(frame, [30, 60], [0, 1]),
      }}>
        <h1 style={{ fontSize: '3em', marginBottom: '0.5em' }}>{title}</h1>
        <h2 style={{ fontSize: '1.5em' }}>{subtitle}</h2>
      </div>
    </AbsoluteFill>
  )
}
