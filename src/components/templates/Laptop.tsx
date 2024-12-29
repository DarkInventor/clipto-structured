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






// import React, { useMemo } from 'react'
// import { AbsoluteFill, useVideoConfig, useCurrentFrame, spring, interpolate } from 'remotion'

// interface LaptopProps {
//   src: string;
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
//   src,
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

//   console.log('Laptop: Current frame', frame);

//   const sequence = useMemo(() => {
//     const sequenceDuration = Math.floor(durationInFrames / 4);
//     return [
//       { frame: 0, scale: 0.8, rotateX: 30, rotateY: -30, translateY: 100 },
//       { frame: sequenceDuration, scale: 1, rotateX: 0, rotateY: 0, translateY: 0 },
//       { frame: sequenceDuration * 2, scale: 1.2, rotateX: -15, rotateY: 15, translateY: -50 },
//       { frame: sequenceDuration * 3, scale: 1, rotateX: 0, rotateY: 30, translateY: 0 },
//       { frame: durationInFrames - 1, scale: 0.9, rotateX: 15, rotateY: -15, translateY: 50 },
//     ];
//   }, [durationInFrames]);

//   const { scale, rotateX, rotateY, translateY } = useMemo(() => {
//     const progress = (frame / durationInFrames) % 1;
//     const springValue = spring({
//       fps,
//       frame: frame % durationInFrames,
//       config: { damping: 100, stiffness: 200, mass: 0.5 },
//     });

//     const index = Math.floor(progress * (sequence.length - 1));
//     const nextIndex = (index + 1) % sequence.length;

//     const scaleValue = interpolate(springValue, [0, 1], [sequence[index].scale, sequence[nextIndex].scale]);
//     const rotateXValue = interpolate(springValue, [0, 1], [sequence[index].rotateX, sequence[nextIndex].rotateX]);
//     const rotateYValue = interpolate(springValue, [0, 1], [sequence[index].rotateY, sequence[nextIndex].rotateY]);
//     const translateYValue = interpolate(springValue, [0, 1], [sequence[index].translateY, sequence[nextIndex].translateY]);

//     return { scale: scaleValue, rotateX: rotateXValue, rotateY: rotateYValue, translateY: translateYValue };
//   }, [frame, durationInFrames, fps, sequence]);

//   const MediaComponent = isVideo ? 'video' : 'img';

//   return (
//     <AbsoluteFill style={{ backgroundColor, perspective: '1500px' }}>
//       <div style={{
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         width: '80%',
//         height: '50%',
//         transform: `translate(-50%, -50%) scale(${scale * (zoom / 100)}) rotateX(${rotateX}deg) rotateY(${rotateY + rotation}deg) translateY(${translateY}px)`,
//         transformStyle: 'preserve-3d',
//         transition: 'transform 0.1s ease-out',
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
//           }}>
//             <MediaComponent 
//               src={src} 
//               style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
//               {...(isVideo ? { autoPlay: true, loop: true, muted: volume === 0, volume: volume / 100 } : {})}
//             />
//           </div>
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
//         }} />
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








// import React from 'react'
// import { AbsoluteFill, useVideoConfig, useCurrentFrame, spring, interpolate } from 'remotion'

// interface LaptopProps {
//   src: string;
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
//   src,
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
//   const { fps, width, height } = useVideoConfig();

//   const progress = frame / durationInFrames;

//   const laptopSpring = spring({
//     fps,
//     frame,
//     config: { damping: 100, stiffness: 200, mass: 0.5 },
//     durationInFrames,
//   });

//   const screenSpring = spring({
//     fps,
//     frame,
//     config: { damping: 100, stiffness: 200, mass: 0.5 },
//     durationInFrames,
//   });

//   const laptopRotateX = interpolate(laptopSpring, [0, 0.5, 1], [15, -15, 15]);
//   const laptopRotateY = interpolate(laptopSpring, [0, 0.5, 1], [-30, 30, -30]) + rotation;
//   const laptopScale = interpolate(laptopSpring, [0, 0.5, 1], [0.8, 1.2, 0.8]) * (zoom / 100);

//   const screenRotateX = interpolate(screenSpring, [0, 0.5, 1], [-90, -45, -90]);

//   const MediaComponent = isVideo ? 'video' : 'img';

//   return (
//     <AbsoluteFill style={{ backgroundColor, perspective: '1500px' }}>
//       <div style={{
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         width: '80%',
//         height: '50%',
//         transform: `
//           translate(-50%, -50%)
//           scale(${laptopScale})
//           rotateX(${laptopRotateX}deg)
//           rotateY(${laptopRotateY}deg)
//         `,
//         transformStyle: 'preserve-3d',
//       }}>
//         {/* Laptop base */}
//         <div style={{
//           position: 'absolute',
//           width: '100%',
//           height: '100%',
//           backgroundColor: '#0f0f0f',
//           borderRadius: '15px',
//           boxShadow: '0 0 20px rgba(0,0,0,0.3)',
//           border: '2px solid #2a2a2a',
//         }} />
//         {/* Laptop screen */}
//         <div style={{
//           position: 'absolute',
//           width: '100%',
//           height: '100%',
//           transformOrigin: 'bottom',
//           transform: `rotateX(${screenRotateX}deg)`,
//         }}>
//           <div style={{
//             position: 'absolute',
//             width: '92%',
//             height: '92%',
//             top: '4%',
//             left: '4%',
//             overflow: 'hidden',
//             backgroundColor: '#000',
//           }}>
//             <MediaComponent 
//               src={src} 
//               style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
//               {...(isVideo ? { muted: volume === 0, volume: volume / 100, loop: true, autoPlay: true } : {})}
//             />
//           </div>
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






// import React from 'react'
// import { AbsoluteFill, useVideoConfig, useCurrentFrame, spring, interpolate } from 'remotion'

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
//   startFrom: number;
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
//   startFrom,
// }) => {
//   const frame = useCurrentFrame();
//   const { fps } = useVideoConfig();
  
//   const adjustedFrame = frame - startFrom;

//   const laptopSpring = spring({
//     fps,
//     frame: adjustedFrame,
//     config: { damping: 100, stiffness: 200, mass: 0.5 },
//     durationInFrames,
//   });

//   const screenSpring = spring({
//     fps,
//     frame: adjustedFrame,
//     config: { damping: 100, stiffness: 200, mass: 0.5 },
//     durationInFrames,
//   });

//   const laptopRotateX = interpolate(laptopSpring, [0, 0.5, 1], [15, -15, 15]);
//   const laptopRotateY = interpolate(laptopSpring, [0, 0.5, 1], [-30, 30, -30]) + rotation;
//   const laptopScale = interpolate(laptopSpring, [0, 0.5, 1], [0.8, 1.2, 0.8]) * (zoom / 100);
//   const screenRotateX = interpolate(screenSpring, [0, 0.5, 1], [-90, -45, -90]);

//   const MediaComponent = isVideo ? 'video' : 'img';

//   return (
//     <AbsoluteFill style={{ backgroundColor, perspective: '1500px' }}>
//       <div style={{
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         width: '80%',
//         height: '50%',
//         transform: `
//           translate(-50%, -50%)
//           scale(${laptopScale})
//           rotateX(${laptopRotateX}deg)
//           rotateY(${laptopRotateY}deg)
//         `,
//         transformStyle: 'preserve-3d',
//       }}>
//         {/* Laptop base */}
//         <div style={{
//           position: 'absolute',
//           width: '100%',
//           height: '100%',
//           backgroundColor: '#0f0f0f',
//           borderRadius: '15px',
//           boxShadow: '0 0 20px rgba(0,0,0,0.3)',
//           border: '2px solid #2a2a2a',
//         }} />
//         {/* Laptop screen */}
//         <div style={{
//           position: 'absolute',
//           width: '100%',
//           height: '100%',
//           transformOrigin: 'bottom',
//           transform: `rotateX(${screenRotateX}deg)`,
//           backgroundColor: '#2a2a2a',
//           borderRadius: '15px 15px 0 0',
//         }}>
//           <div style={{
//             position: 'absolute',
//             width: '92%',
//             height: '92%',
//             top: '4%',
//             left: '4%',
//             overflow: 'hidden',
//             backgroundColor: '#000',
//             borderRadius: '8px',
//           }}>
//             <MediaComponent 
//               src={media}
//               style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//               {...(isVideo ? {
//                 muted: volume === 0,
//                 volume: volume / 100,
//                 loop: true,
//                 autoPlay: true,
//                 playsInline: true,
//               } : {})}
//             />
//           </div>
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