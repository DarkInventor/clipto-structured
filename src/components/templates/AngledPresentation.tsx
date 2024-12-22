// import React from 'react'
// import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion'

// interface AngledPresentationProps {
//   media: string;
//   isVideo: boolean;
//   volume: number;
//   title: string;
//   subtitle: string;
//   zoom: number;
//   rotation: number;
//   text: string;
//   MediaComponent: React.ComponentType<any>;
// }

// export const AngledPresentation: React.FC<AngledPresentationProps> = ({
//   media,
//   isVideo,
//   volume,
//   title,
//   subtitle,
//   zoom,
//   rotation,
//   text,
//   MediaComponent,
// }) => {
//   const frame = useCurrentFrame()
//   const zoomProgress = interpolate(frame, [0, 30], [1, zoom / 100], {
//     extrapolateRight: 'clamp',
//   });
//   const rotationProgress = interpolate(frame, [0, 30], [0, rotation], {
//     extrapolateRight: 'clamp',
//   });

//   return (
//     <AbsoluteFill
//       style={{
//         backgroundColor: 'white',
//         justifyContent: 'center',
//         alignItems: 'center',
//         transform: `scale(${zoomProgress}) rotate(${rotationProgress}deg)`,
//       }}
//     >
//       <div style={{ width: '80%', height: '80%', position: 'relative' }}>
//         <MediaComponent
//           src={media}
//           style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//           volume={isVideo ? volume : undefined}
//         />
//         <div
//           style={{
//             position: 'absolute',
//             bottom: 20,
//             left: 20,
//             color: 'white',
//             textShadow: '0 0 5px rgba(0,0,0,0.5)',
//           }}
//         >
//           <h1 style={{ fontSize: 40, marginBottom: 10 }}>{title}</h1>
//           <h2 style={{ fontSize: 24 }}>{subtitle}</h2>
//         </div>
//         {text && (
//           <div
//             style={{
//               position: 'absolute',
//               top: 20,
//               right: 20,
//               backgroundColor: 'rgba(0,0,0,0.5)',
//               color: 'white',
//               padding: 10,
//               borderRadius: 5,
//             }}
//           >
//             {text}
//           </div>
//         )}
//       </div>
//     </AbsoluteFill>
//   )
// }

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