import React, { useMemo } from 'react'
import { AbsoluteFill, interpolate, Img, Video, Easing } from 'remotion'

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
  const baseDuration = 5 * 60; // 5 seconds at 60fps
  const loopedFrame = frame % baseDuration;
  
  const keyframes = useMemo(() => {
    return {
   
      0: {
        z: 330,
        rotateY: -20,
        rotateX: 15,
        rotate: -7,
        easing: Easing.bezier(0, 0, 0, 1),
        scale: 1 
      },
      60: {
        z: 0,
        rotateY: 0,
        rotateX: 0,
        rotate: 0,
        easing: Easing.linear,
        scale: 1.2
      },
      160: {
        z: 330,
        rotateY: 20,
        rotateX: 15,
        rotate: 7,
        easing: Easing.bezier(0, 0, 0, 1),
        scale: 1
      },
      300: {
        z: 0,
        rotateY: 0,
        rotateX: 0,
        rotate: 0,
        scale: 1.2
      },
    }
    
  }, [])

  const currentFromKeyframe = useMemo(() => {
    const keyframeValues = Object.values(keyframes)
    const keyframeFrames = Object.keys(keyframes).map(Number)
    
    const currentIndex = keyframeFrames.findIndex(f => f > loopedFrame) - 1
    const safeIndex = Math.max(0, currentIndex)
    
    if (safeIndex === keyframeFrames.length - 1) {
      return keyframeValues[safeIndex]
    }
    
    const currentFrame = keyframeFrames[safeIndex]
    const nextFrame = keyframeFrames[safeIndex + 1]
    const currentKeyframe = keyframeValues[safeIndex]
    const nextKeyframe = keyframeValues[safeIndex + 1]
    
    return {
      z: interpolate(loopedFrame, [currentFrame, nextFrame], [currentKeyframe.z, nextKeyframe.z]),
      rotateY: interpolate(loopedFrame, [currentFrame, nextFrame], [currentKeyframe.rotateY, nextKeyframe.rotateY]),
      rotateX: interpolate(loopedFrame, [currentFrame, nextFrame], [currentKeyframe.rotateX, nextKeyframe.rotateX]),
      rotate: interpolate(loopedFrame, [currentFrame, nextFrame], [currentKeyframe.rotate, nextKeyframe.rotate]),
      scale: interpolate(loopedFrame, [currentFrame, nextFrame], [currentKeyframe.scale, nextKeyframe.scale]),
    }
  }, [loopedFrame, keyframes])

  return (
    <AbsoluteFill style={{ 
      backgroundColor, 
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
        borderRadius: 5,
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







// import React, { useMemo } from 'react';
// import {
//   AbsoluteFill,
//   interpolate,
//   Img,
//   Video,
//   useCurrentFrame,
//   useVideoConfig,
//   spring,
//   Sequence,
//   Composition,
// } from 'remotion';

// interface AngledPresentationProps {
//   media: string;
//   isVideo: boolean;
//   volume: number;
//   title: string;
//   subtitle: string;
//   deviceColor: string;
//   backgroundColor: string;
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
// }) => {
//   const frame = useCurrentFrame();
//   const { fps, durationInFrames } = useVideoConfig();

//   const rotation = useMemo(() => {
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
//         transform: `perspective(1000px) rotateY(${interpolate(rotation, [0, 1], [-20, 0])}deg)`,
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



