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
  text: string;
  MediaComponent: React.ComponentType<any>;
  duration: number;
  backgroundColor: string;
}

export const AngledPresentation: React.FC<AngledPresentationProps> = ({
  media,
  isVideo,
  volume,
  title,
  subtitle,
  zoom,
  rotation,
  text,
  MediaComponent,
  duration,
  backgroundColor 
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  
  // Ensure we have valid duration values
  const safeDuration = Math.max(1, duration || 10) // Default to 10 seconds if duration is 0 or undefined
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
        {text && (
          <div
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
              padding: 10,
              borderRadius: 5,
            }}
          >
            {text}
          </div>
        )}
      </div>
    </AbsoluteFill>
  )
}





// import React from 'react'
// import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate, spring } from 'remotion'

// interface AngledPresentationProps {
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

// export const AngledPresentation: React.FC<AngledPresentationProps> = ({
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

//   const progress = frame / durationInFrames;

//   const scale = spring({
//     fps,
//     frame,
//     config: { damping: 100, stiffness: 200, mass: 0.5 },
//     durationInFrames,
//   });

//   const rotateY = spring({
//     fps,
//     frame,
//     config: { damping: 100, stiffness: 200, mass: 0.5 },
//     durationInFrames,
//   });

//   const translateZ = spring({
//     fps,
//     frame,
//     config: { damping: 100, stiffness: 200, mass: 0.5 },
//     durationInFrames,
//   });

//   const scaleValue = interpolate(scale, [0, 1], [1, 1.5]);
//   const rotateYValue = interpolate(rotateY, [0, 0.25, 0.75, 1], [0, 30, -30, 0]);
//   const translateZValue = interpolate(translateZ, [0, 0.5, 1], [0, 200, 0]);

//   const MediaComponent = isVideo ? 'video' : 'img';

//   return (
//     <AbsoluteFill style={{ backgroundColor, perspective: '1200px' }}>
//       <div style={{
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         width: '80%',
//         height: '80%',
//         transform: `
//           translate(-50%, -50%)
//           scale(${scaleValue * (zoom / 100)})
//           rotateY(${rotateYValue + rotation}deg)
//           translateZ(${translateZValue}px)
//         `,
//         transition: 'transform 0.1s ease-out',
//       }}>
//         <div style={{
//           width: '100%',
//           height: '100%',
//           borderRadius: '20px',
//           overflow: 'hidden',
//           boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
//         }}>
//           <MediaComponent 
//             src={src} 
//             style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
//             {...(isVideo ? { muted: true, loop: true, autoPlay: true } : {})}
//           />
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

// interface AngledPresentationProps {
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

// export const AngledPresentation: React.FC<AngledPresentationProps> = ({
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

//   const scale = spring({
//     fps,
//     frame,
//     config: { damping: 100, stiffness: 200, mass: 0.5 },
//     durationInFrames,
//   });

//   const rotateY = spring({
//     fps,
//     frame,
//     config: { damping: 100, stiffness: 200, mass: 0.5 },
//     durationInFrames,
//   });

//   const translateZ = spring({
//     fps,
//     frame,
//     config: { damping: 100, stiffness: 200, mass: 0.5 },
//     durationInFrames,
//   });

//   const scaleValue = interpolate(scale, [0, 1], [0.8, 1.2]);
//   const rotateYValue = interpolate(rotateY, [0, 0.5, 1], [-30, 30, -30]);
//   const translateZValue = interpolate(translateZ, [0, 0.5, 1], [-200, 0, -200]);

//   const MediaComponent = isVideo ? 'video' : 'img';

//   return (
//     <AbsoluteFill style={{ backgroundColor, perspective: '1200px' }}>
//       <div style={{
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         width: '80%',
//         height: '80%',
//         transform: `
//           translate(-50%, -50%)
//           scale(${scaleValue * (zoom / 100)})
//           rotateY(${rotateYValue + rotation}deg)
//           translateZ(${translateZValue}px)
//         `,
//       }}>
//         <div style={{
//           width: '100%',
//           height: '100%',
//           borderRadius: '20px',
//           overflow: 'hidden',
//           boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
//         }}>
//           <MediaComponent 
//             src={src} 
//             style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
//             {...(isVideo ? { muted: volume === 0, volume: volume / 100, loop: true, autoPlay: true } : {})}
//           />
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
//   startFrom: number;
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
//   startFrom,
// }) => {
//   const frame = useCurrentFrame();
//   const { fps } = useVideoConfig();

//   const adjustedFrame = frame - startFrom;
  
//   const scale = spring({
//     fps,
//     frame: adjustedFrame,
//     config: { damping: 100, stiffness: 200, mass: 0.5 },
//     durationInFrames,
//   });

//   const rotateY = spring({
//     fps,
//     frame: adjustedFrame,
//     config: { damping: 100, stiffness: 200, mass: 0.5 },
//     durationInFrames,
//   });

//   const translateZ = spring({
//     fps,
//     frame: adjustedFrame,
//     config: { damping: 100, stiffness: 200, mass: 0.5 },
//     durationInFrames,
//   });

//   const scaleValue = interpolate(scale, [0, 1], [0.8, 1.2]);
//   const rotateYValue = interpolate(rotateY, [0, 0.5, 1], [-30, 30, -30]);
//   const translateZValue = interpolate(translateZ, [0, 0.5, 1], [-200, 0, -200]);

//   const MediaComponent = isVideo ? 'video' : 'img';

//   return (
//     <AbsoluteFill style={{ backgroundColor, perspective: '1200px' }}>
//       <div style={{
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         width: '80%',
//         height: '80%',
//         transform: `
//           translate(-50%, -50%)
//           scale(${scaleValue * (zoom / 100)})
//           rotateY(${rotateYValue + rotation}deg)
//           translateZ(${translateZValue}px)
//         `,
//       }}>
//         <div style={{
//           width: '100%',
//           height: '100%',
//           borderRadius: '20px',
//           overflow: 'hidden',
//           boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
//         }}>
//           <MediaComponent 
//             src={media}
//             style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//             {...(isVideo ? {
//               muted: volume === 0,
//               volume: volume / 100,
//               loop: true,
//               autoPlay: true,
//               playsInline: true,
//             } : {})}
//           />
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