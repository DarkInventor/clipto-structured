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


// import React, { useMemo } from 'react'
// import { AbsoluteFill, useCurrentFrame, interpolate, Img, Video, spring, useVideoConfig } from 'remotion'

// interface LaptopProps {
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

// export const Laptop: React.FC<LaptopProps> = ({
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
//   const { fps } = useVideoConfig();
//   const loopDuration = 10 * fps; // 10 seconds loop
//   const loopedFrame = frame % loopDuration;

//   const sequences = useMemo(() => [
//     { name: 'intro', duration: fps },
//     { name: 'zoomToScreen', duration: 2 * fps },
//     { name: 'screenShowcase', duration: 3 * fps },
//     { name: 'rotateToSide', duration: fps },
//     { name: 'sideView', duration: fps },
//     { name: 'zoomOut', duration: 2 * fps },
//   ], [fps]);

//   const getCurrentSequence = () => {
//     let accumulatedDuration = 0;
//     for (const seq of sequences) {
//       if (loopedFrame < accumulatedDuration + seq.duration) {
//         return { ...seq, startFrame: accumulatedDuration };
//       }
//       accumulatedDuration += seq.duration;
//     }
//     return sequences[sequences.length - 1];
//   };

//   // @ts-ignore
//   const { name: sequenceName, startFrame } = getCurrentSequence();
//   const sequenceFrame = loopedFrame - startFrame;

//   const springConfig = { damping: 12, stiffness: 120 };

//   const progress = spring({
//     fps,
//     frame: sequenceFrame,
//     config: springConfig,
//   });

//   const getTransform = () => {
//     switch (sequenceName) {
//       case 'intro':
//         return `
//           scale(${interpolate(progress, [0, 1], [0.5, 1])} )
//           rotateX(${interpolate(progress, [0, 1], [30, 15])}deg)
//           rotateY(${interpolate(progress, [0, 1], [-30, -15])}deg)
//           translateY(${interpolate(progress, [0, 1], [100, 0])}px)
//         `;
//       case 'zoomToScreen':
//         return `
//           scale(${interpolate(progress, [0, 1], [1, 2])} )
//           rotateX(${interpolate(progress, [0, 1], [15, 0])}deg)
//           rotateY(${interpolate(progress, [0, 1], [-15, 0])}deg)
//           translateY(${interpolate(progress, [0, 1], [0, -50])}px)
//         `;
//       case 'screenShowcase':
//         const wobble = Math.sin(sequenceFrame * 0.2) * 2;
//         return `
//           scale(2)
//           rotateX(${wobble}deg)
//           rotateY(${wobble}deg)
//           translateY(-50px)
//         `;
//       case 'rotateToSide':
//         return `
//           scale(${interpolate(progress, [0, 1], [2, 1.5])} )
//           rotateX(${interpolate(progress, [0, 1], [0, 10])}deg)
//           rotateY(${interpolate(progress, [0, 1], [0, 60])}deg)
//           translateX(${interpolate(progress, [0, 1], [0, 100])}px)
//         `;
//       case 'sideView':
//         const sideWobble = Math.sin(sequenceFrame * 0.3) * 5;
//         return `
//           scale(1.5)
//           rotateX(10deg)
//           rotateY(${60 + sideWobble}deg)
//           translateX(100px)
//         `;
//       case 'zoomOut':
//         return `
//           scale(${interpolate(progress, [0, 1], [1.5, 0.8])} )
//           rotateX(${interpolate(progress, [0, 1], [10, 20])}deg)
//           rotateY(${interpolate(progress, [0, 1], [60, -20])}deg)
//           translateY(${interpolate(progress, [0, 1], [0, 50])}px)
//         `;
//       default:
//         return '';
//     }
//   };

//   const screenOpacity = interpolate(
//     loopedFrame,
//     [0, fps, 3 * fps, 8 * fps, loopDuration],
//     [0, 1, 1, 1, 0],
//     { extrapolateRight: 'clamp' }
//   );

//   return (
//     <AbsoluteFill style={{ backgroundColor, perspective: '1500px' }}>
//       <div style={{
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         width: '80%',
//         height: '50%',
//         transform: `translate(-50%, -50%) ${getTransform()} rotateY(${rotation}deg) scale(${zoom / 100})`,
//         transformStyle: 'preserve-3d',
//         transition: 'transform 0.5s ease-in-out',
//       }}>
//         {/* Laptop lid */}
//         <div style={{
//           position: 'absolute',
//           width: '100%',
//           height: '100%',
//           backgroundColor: '#0f0f0f',
//           borderRadius: '15px',
//           overflow: 'hidden',
//           boxShadow: '0 0 20px rgba(0,0,0,0.3)',
//           border: '2px solid #2a2a2a',
//           transformStyle: 'preserve-3d',
//         }}>
//           {/* Screen */}
//           <div style={{
//             position: 'absolute',
//             top: '4%',
//             left: '4%',
//             width: '92%',
//             height: '92%',
//             overflow: 'hidden',
//             opacity: screenOpacity,
//           }}>
//             {isVideo ? (
//               <Video src={media} style={{ width: '100%', height: '100%', objectFit: 'cover' }} volume={volume} />
//             ) : (
//               <Img src={media} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//             )}
//           </div>
//           {/* Webcam */}
//           <div style={{
//             position: 'absolute',
//             top: '2%',
//             left: '50%',
//             width: '4px',
//             height: '4px',
//             borderRadius: '50%',
//             backgroundColor: '#333',
//             transform: 'translateX(-50%)',
//           }} />
//         </div>
//         {/* Laptop base */}
//         <div style={{
//           position: 'absolute',
//           width: '100%',
//           height: '5%',
//           bottom: '-5%',
//           backgroundColor: '#0f0f0f',
//           borderRadius: '0 0 15px 15px',
//           transformOrigin: 'top',
//           transform: 'rotateX(-90deg)',
//           boxShadow: '0 5px 10px rgba(0,0,0,0.2)',
//         }}>
//           {/* Touchpad */}
//           <div style={{
//             position: 'absolute',
//             top: '20%',
//             left: '50%',
//             width: '40%',
//             height: '60%',
//             backgroundColor: '#2a2a2a',
//             transform: 'translateX(-50%)',
//             borderRadius: '5px',
//           }} />
//         </div>
//       </div>
//       <div style={{
//         position: 'absolute',
//         bottom: '10%',
//         left: '10%',
//         right: '10%',
//         textAlign: 'center',
//         color: 'white',
//         textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
//       }}>
//         <h1 style={{ fontSize: '3em', marginBottom: '0.5em' }}>{title}</h1>
//         <h2 style={{ fontSize: '1.5em' }}>{subtitle}</h2>
//       </div>
//     </AbsoluteFill>
//   );
// };

