import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, Img, Video } from 'remotion'

interface QuickTeaserProps {
  media: string;
  isVideo: boolean;
  volume: number;
  title: string;
  subtitle: string;
  zoom: number;
  rotation: number;
  backgroundColor: string;
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
}) => {
  const frame = useCurrentFrame()
  
  const scale = interpolate(frame, [0, 30], [0.8, 1]) * (zoom / 100)
  const rotate = interpolate(frame, [0, 60], [0, rotation])

  return (
    <AbsoluteFill style={{ backgroundColor, alignItems: "center", justifyContent: "center" }}>
      <div style={{
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        width: '80%',
        height: '80%',
        overflow: 'hidden',
        borderRadius: '20px',
        boxShadow: '0 0 20px rgba(0, 0, 0, .2)',
        backgroundColor,
      }}>
        {isVideo ? (
          <Video src={media} style={{ width: "100%", height: "100%", objectFit: "cover", backgroundColor }} volume={volume} />
        ) : (
          <Img src={media} style={{ width: "100%", height: "100%", objectFit: "cover", backgroundColor }} />
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
