import React, { useMemo } from 'react'
import { AbsoluteFill, interpolate, Img, Video } from 'remotion'

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
      0: { z: 330, rotateY: -20, rotateX: 15, rotate: -7, scale: 1 },
      30: { z: 0, rotateY: 0, rotateX: 0, rotate: 0, scale: 1.2 },
      80: { z: 330, rotateY: 20, rotateX: 15, rotate: 7, scale: 1 },
      150: { z: 0, rotateY: 0, rotateX: 0, rotate: 0, scale: 1.2 },
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







// import React, { useMemo } from 'react'
// import { AbsoluteFill, interpolate, Img, Video, useCurrentFrame, spring } from 'remotion'

// interface AngledPresentationProps {
//   media: string;
//   isVideo: boolean;
//   volume: number;
//   title: string;
//   subtitle: string;
//   zoom: number;
//   rotation: number;
//   backgroundColor: string;
//   durationInFrames: number;
// }

// export const AngledPresentation: React.FC<AngledPresentationProps> = ({
//   media,
//   isVideo,
//   volume,
//   title,
//   subtitle,
//   zoom,
//   rotation,
//   backgroundColor,
//   durationInFrames,
// }) => {
//   const frame = useCurrentFrame();
//   const fps = 60;

//   const sequence = useMemo(() => [
//     { start: 0, end: 60, name: 'intro' },
//     { start: 60, end: 120, name: 'zoom' },
//     { start: 120, end: 180, name: 'angle1' },
//     { start: 180, end: 240, name: 'angle2' },
//     { start: 240, end: 300, name: 'finale' },
//   ], []);

//   const getCurrentSequence = () => {
//     const loopedFrame = frame % 300;
//     return sequence.find(seq => loopedFrame >= seq.start && loopedFrame < seq.end) || sequence[0];
//   };

//   const { name, start } = getCurrentSequence();
//   const sequenceFrame = frame % 300 - start;

//   const scale = spring({
//     fps,
//     frame: sequenceFrame,
//     config: {
//       damping: 100,
//       stiffness: 200,
//       mass: 0.5,
//     },
//   });

//   const rotateY = spring({
//     fps,
//     frame: sequenceFrame,
//     config: {
//       damping: 100,
//       stiffness: 200,
//       mass: 0.5,
//     },
//   });

//   const translateZ = spring({
//     fps,
//     frame: sequenceFrame,
//     config: {
//       damping: 100,
//       stiffness: 200,
//       mass: 0.5,
//     },
//   });

//   const getTransform = () => {
//     switch (name) {
//       case 'intro':
//         return `
//           scale(${interpolate(scale, [0, 1], [0.5, 1])} )
//           rotateY(${interpolate(rotateY, [0, 1], [45, 0])}deg)
//           translateZ(${interpolate(translateZ, [0, 1], [-500, 0])}px)
//         `;
//       case 'zoom':
//         return `
//           scale(${interpolate(scale, [0, 1], [1, 1.5])} )
//           rotateY(${rotation}deg)
//         `;
//       case 'angle1':
//         return `
//           scale(${1.2 * (zoom / 100)})
//           rotateY(${interpolate(rotateY, [0, 1], [0, 30])}deg)
//           rotateX(${interpolate(rotateY, [0, 1], [0, -15])}deg)
//         `;
//       case 'angle2':
//         return `
//           scale(${1.2 * (zoom / 100)})
//           rotateY(${interpolate(rotateY, [0, 1], [30, -30])}deg)
//           rotateX(${interpolate(rotateY, [0, 1], [-15, 15])}deg)
//         `;
//       case 'finale':
//         return `
//           scale(${interpolate(scale, [0, 1], [1.2, 1])} )
//           rotateY(${interpolate(rotateY, [0, 1], [-30, 0])}deg)
//           translateZ(${interpolate(translateZ, [0, 1], [0, 200])}px)
//         `;
//       default:
//         return '';
//     }
//   };

//   return (
//     <AbsoluteFill 
//       style={{ 
//         backgroundColor, 
//         display: "flex", 
//         justifyContent: "center", 
//         alignItems: "center",
//         perspective: "1200px",
//       }}
//     >
//       <div 
//         style={{
//           width: "80%",
//           height: "80%",
//           position: "relative",
//           transformStyle: "preserve-3d",
//           transform: getTransform(),
//           transition: "transform 0.5s ease-in-out",
//         }}
//       >
//         <div 
//           style={{
//             position: "absolute",
//             width: "100%",
//             height: "100%",
//             backgroundColor: "#fff",
//             borderRadius: 20,
//             overflow: "hidden",
//             boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
//           }}
//         >
//           {isVideo ? (
//             <Video 
//               src={media} 
//               style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
//               volume={volume} 
//             />
//           ) : (
//             <Img 
//               src={media} 
//               style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
//             />
//           )}
//         </div>
//         <div 
//           style={{
//             position: "absolute",
//             top: "100%",
//             left: 0,
//             right: 0,
//             height: "30%",
//             background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
//             transform: "rotateX(90deg) translateY(-50%)",
//             opacity: 0.6,
//           }}
//         />
//       </div>
//       <div 
//         style={{
//           position: 'absolute',
//           bottom: '10%',
//           left: '10%',
//           right: '10%',
//           textAlign: 'center',
//           color: 'white',
//           textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
//         }}
//       >
//         <h1 style={{ fontSize: '3em', marginBottom: '0.5em' }}>{title}</h1>
//         <h2 style={{ fontSize: '1.5em' }}>{subtitle}</h2>
//       </div>
//     </AbsoluteFill>
//   );
// };