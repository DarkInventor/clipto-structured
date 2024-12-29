// import React from 'react'
// import { AbsoluteFill, useCurrentFrame, interpolate, Img, Video } from 'remotion'

// interface DynamicShowcaseProps {
//   media: string;
//   isVideo: boolean;
//   volume: number;
//   title: string;
//   subtitle: string;
//   zoom: number;
//   rotation: number;
//   backgroundColor: string;
// }

// export const DynamicShowcase: React.FC<DynamicShowcaseProps> = ({
//   media,
//   isVideo,
//   volume,
//   title,
//   subtitle,
//   zoom,
//   rotation,
//   backgroundColor,
// }) => {
//   const frame = useCurrentFrame()
//   const opacity = interpolate(frame, [0, 30], [0, 1])
//   const scale = interpolate(frame, [0, 30], [0.8, 1]) * (zoom / 100)
//   const rotate = interpolate(frame, [0, 60, 120], [0, rotation, 0])

//   return (
//     <AbsoluteFill style={{ backgroundColor, justifyContent: 'center', alignItems: 'center' }}>
//       <div style={{
//         opacity,
//         transform: `scale(${scale}) rotate(${rotate}deg)`,
//         width: '80%',
//         height: '80%',
//         overflow: 'hidden',
//         borderRadius: '20px',
//         boxShadow: '0 0 20px rgba(255,255,255,0.3)',
//         backgroundColor,
//       }}>
//         {isVideo ? (
//           <Video src={media} style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor }} volume={volume} />
//         ) : (
//           <Img src={media} style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor }} />
//         )}
//       </div>
//       <div style={{
//         position: 'absolute',
//         bottom: '10%',
//         left: '10%',
//         right: '10%',
//         textAlign: 'center',
//         color: 'white',
//         textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
//         opacity: interpolate(frame, [30, 60], [0, 1]),
//       }}>
//         <h1 style={{ fontSize: '3em', marginBottom: '0.5em' }}>{title}</h1>
//         <h2 style={{ fontSize: '1.5em' }}>{subtitle}</h2>
//       </div>
//     </AbsoluteFill>
//   )
// }





import React, { useMemo } from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, Img, Video, useVideoConfig } from 'remotion'

interface DynamicShowcaseProps {
  media: string;
  isVideo: boolean;
  volume: number;
  title: string;
  subtitle: string;
  zoom: number;
  rotation: number;
  backgroundColor: string;
  durationInFrames: number;
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
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const loopDuration = 10 * fps; // 10 seconds loop
  const loopedFrame = frame % loopDuration;

  const sequences = useMemo(() => [
    { name: 'zoomIn', duration: 2 * fps },
    { name: 'panLeft', duration: 2 * fps },
    { name: 'zoomOut', duration: 2 * fps },
    { name: 'panRight', duration: 2 * fps },
    { name: 'tiltAndRotate', duration: 2 * fps },
  ], [fps]);

  const getCurrentSequence = () => {
    let accumulatedDuration = 0;
    for (const seq of sequences) {
      if (loopedFrame < accumulatedDuration + seq.duration) {
        return { ...seq, startFrame: accumulatedDuration };
      }
      accumulatedDuration += seq.duration;
    }
    return sequences[sequences.length - 1];
  };

  // @ts-ignore
  const { name: sequenceName, startFrame, duration } = getCurrentSequence();
  const sequenceProgress = (loopedFrame - startFrame) / duration;

  const getTransform = () => {
    switch (sequenceName) {
      case 'zoomIn':
        return `
          scale(${interpolate(sequenceProgress, [0, 1], [1, 1.5])})
          rotateY(${interpolate(sequenceProgress, [0, 1], [0, 10])}deg)
        `;
      case 'panLeft':
        return `
          scale(1.5)
          translateX(${interpolate(sequenceProgress, [0, 1], [0, -100])}px)
          rotateY(${interpolate(sequenceProgress, [0, 1], [10, -10])}deg)
        `;
      case 'zoomOut':
        return `
          scale(${interpolate(sequenceProgress, [0, 1], [1.5, 1])})
          rotateY(${interpolate(sequenceProgress, [0, 1], [-10, 0])}deg)
        `;
      case 'panRight':
        return `
          scale(1)
          translateX(${interpolate(sequenceProgress, [0, 1], [-100, 100])}px)
          rotateY(${interpolate(sequenceProgress, [0, 1], [0, 10])}deg)
        `;
      case 'tiltAndRotate':
        return `
          scale(${interpolate(sequenceProgress, [0, 0.5, 1], [1, 1.2, 1])})
          rotateX(${interpolate(sequenceProgress, [0, 0.5, 1], [0, 10, 0])}deg)
          rotateY(${interpolate(sequenceProgress, [0, 1], [10, -10])}deg)
        `;
      default:
        return '';
    }
  };

  const MediaComponent = isVideo ? Video : Img;

  return (
    <AbsoluteFill style={{ backgroundColor, perspective: '1000px' }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '80%',
        height: '80%',
        transform: `translate(-50%, -50%) ${getTransform()} rotateY(${rotation}deg) scale(${zoom / 100})`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out',
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          borderRadius: '20px',
          boxShadow: '0 0 20px rgba(0,0,0,0.3)',
        }}>
          <MediaComponent src={media} style={{ width: '100%', height: '100%', objectFit: 'cover' }} volume={isVideo ? volume : undefined} />
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
        opacity: interpolate(loopedFrame, [0, 30, loopDuration - 30, loopDuration], [0, 1, 1, 0]),
      }}>
        <h1 style={{ fontSize: '3em', marginBottom: '0.5em' }}>{title}</h1>
        <h2 style={{ fontSize: '1.5em' }}>{subtitle}</h2>
      </div>
    </AbsoluteFill>
  );
};

