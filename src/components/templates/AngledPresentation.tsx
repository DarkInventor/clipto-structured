import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from 'remotion'

interface AngledPresentationProps {
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

export const AngledPresentation: React.FC<AngledPresentationProps> = ({
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
  const { fps } = useVideoConfig()
  
  // Ensure we have valid duration values
  const safeDuration = Math.max(1, durationInFrames || 10) // Default to 10 seconds if duration is 0 or undefined
  const totalFrames = safeDuration * fps
  const initialAnimationDuration = Math.min(fps, totalFrames / 4) // Use 1/4 of total duration, max 1 second
  
  const zoomProgress = interpolate(
    frame,
    [0, Math.max(1, initialAnimationDuration)], // Ensure we don't have 0 duration
    [1, zoom / 100],
    {
      extrapolateRight: 'clamp',
    }
  );
  
  const rotationProgress = interpolate(
    frame,
    [0, Math.max(1, initialAnimationDuration)],
    [0, rotation],
    {
      extrapolateRight: 'clamp',
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor, 
        justifyContent: 'center',
        alignItems: 'center',
        transform: `scale(${zoomProgress}) rotate(${rotationProgress}deg)`,
      }}
    >
      <div style={{ width: '80%', height: '80%', position: 'relative', backgroundColor }}>
        {/* @ts-ignore */}
        <MediaComponent
          src={media}
          style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor }}
          volume={isVideo ? volume : undefined}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            color: 'white',
            textShadow: '0 0 5px rgba(0,0,0,0.5)',
          }}
        >
          <h1 style={{ fontSize: 40, marginBottom: 10 }}>{title}</h1>
          <h2 style={{ fontSize: 24 }}>{subtitle}</h2>
        </div>
      </div>
    </AbsoluteFill>
  )
}








// import React, { useMemo } from 'react';
// import {
//   AbsoluteFill,
//   interpolate,
//   Img,
//   Video,
//   useCurrentFrame,
//   useVideoConfig,
//   spring,
// } from 'remotion';

// interface AngledPresentationProps {
//   media: string;
//   isVideo: boolean;
//   volume: number;
//   title: string;
//   subtitle: string;
//   deviceColor: string;
//   backgroundColor: string;
//   zoom?: number;
//   rotation?: number;
//   durationInFrames?: number;
//   startFrom?: number;
// }

// const DeviceFrame: React.FC<{ children: React.ReactNode; deviceColor: string }> = ({ children, deviceColor }) => {
//   return (
//     <div style={{
//       width: '100%',
//       height: '100%',
//       backgroundColor: deviceColor,
//       borderRadius: '30px',
//       padding: '10px',
//       boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
//       display: 'flex',
//       flexDirection: 'column',
//       overflow: 'hidden',
//     }}>
//         {children}
//       </div>
//   );
// };

// const MediaContent: React.FC<{ media: string; isVideo: boolean; volume: number }> = ({
//   media,
//   isVideo,
//   volume,
// }) => {
//   const frame = useCurrentFrame();
//   const { fps, durationInFrames } = useVideoConfig();

//   const scale = useMemo(() => {
//     return spring({
//       fps,
//       frame,
//       config: {
//         damping: 100,
//         stiffness: 200,
//         mass: 0.5,
//       },
//       durationInFrames,
//     });
//   }, [frame, fps, durationInFrames]);

//   const mediaStyle = {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover' as const,
//     transform: `scale(${scale})`,
//   };

//   return isVideo ? (
//     <Video src={media} style={mediaStyle} volume={volume} />
//   ) : (
//     <Img src={media} style={mediaStyle} />
//   );
// };

// const TitleOverlay: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
//   const frame = useCurrentFrame();
//   const { durationInFrames } = useVideoConfig();

//   const opacity = interpolate(
//     frame,
//     [0, 30, durationInFrames - 30, durationInFrames],
//     [0, 1, 1, 0],
//     {
//       extrapolateLeft: 'clamp',
//       extrapolateRight: 'clamp',
//     }
//   );

//   const titleY = interpolate(frame, [0, 30], [50, 0], {
//     extrapolateLeft: 'clamp',
//     extrapolateRight: 'clamp',
//   });

//   const subtitleY = interpolate(frame, [15, 45], [50, 0], {
//     extrapolateLeft: 'clamp',
//     extrapolateRight: 'clamp',
//   });

//   return (
//     <div
//       style={{
//         position: 'absolute',
//         bottom: '10%',
//         left: '10%',
//         right: '10%',
//         textAlign: 'center',
//         color: 'white',
//         textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
//         opacity,
//       }}
//     >
//       <h1
//         style={{
//           fontSize: '3em',
//           marginBottom: '0.5em',
//           transform: `translateY(${titleY}px)`,
//         }}
//       >
//         {title}
//       </h1>
//       <h2
//         style={{
//           fontSize: '1.5em',
//           transform: `translateY(${subtitleY}px)`,
//         }}
//       >
//         {subtitle}
//       </h2>
//     </div>
//   );
// };

// export const AngledPresentation: React.FC<AngledPresentationProps> = ({
//   media,
//   isVideo,
//   volume,
//   title,
//   subtitle,
//   deviceColor,
//   backgroundColor,
//   zoom = 100,
//   rotation = 0,
//   durationInFrames: propDurationInFrames,
//   startFrom = 0,
// }) => {
//   const frame = useCurrentFrame();
//   const { fps, durationInFrames: configDurationInFrames } = useVideoConfig();

//   const actualDurationInFrames = propDurationInFrames || configDurationInFrames;
//   const adjustedFrame = frame - startFrom;

//   const rotationProgress = useMemo(() => {
//     return spring({
//       fps,
//       frame: adjustedFrame,
//       config: {
//         damping: 100,
//         stiffness: 200,
//         mass: 0.5,
//       },
//       durationInFrames: Math.min(actualDurationInFrames, fps * 2), // Limit rotation animation to 2 seconds
//     });
//   }, [adjustedFrame, fps, actualDurationInFrames]);

//   const finalRotation = interpolate(rotationProgress, [0, 1], [-20 + rotation, rotation]);
//   const scale = zoom / 100;

//   return (
//     <AbsoluteFill
//       style={{
//         backgroundColor,
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <div style={{
//         transform: `perspective(1000px) rotateY(${finalRotation}deg) scale(${scale})`,
//         transformStyle: 'preserve-3d',
//       }}>
//         <DeviceFrame deviceColor={deviceColor}>
//           <MediaContent media={media} isVideo={isVideo} volume={volume} />
//         </DeviceFrame>
//       </div>
//       <TitleOverlay title={title} subtitle={subtitle} />
//     </AbsoluteFill>
//   );
// };

