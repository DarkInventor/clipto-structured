// import React from 'react'
// import { AbsoluteFill, Sequence, useVideoConfig, useCurrentFrame } from 'remotion'
// import { AngledPresentation } from './templates/AngledPresentation'
// import { QuickTeaser } from './templates/QuickTeaser'
// import { Laptop } from './templates/Laptop'
// import { DynamicShowcase } from './templates/DynamicShowcase'

// interface Scene {
//   duration: number;
//   zoom: number;
//   rotation: number;
//   text: string;
// }

// interface CompositionProps {
//   scenes?: Scene[];
//   fileUrl?: string;
//   isVideo?: boolean;
//   presentationType?: 'angled' | 'quickTeaser' | 'laptop' | 'dynamicShowcase';
//   audioVolume?: number;
//   adTitle?: string;
//   adDescription?: string;
//   backgroundColor: string;
//   backgroundImage: string | null;
//   durationInSeconds: number;
// }

// const MyComposition: React.FC<CompositionProps> = ({
//   scenes = [],
//   fileUrl = '',
//   isVideo = false,
//   presentationType = 'angled',
//   audioVolume = 1,
//   adTitle = '',
//   adDescription = '',
//   backgroundColor = '#ffffff',
//   backgroundImage,
//   durationInSeconds,
// }) => {
//   const { fps } = useVideoConfig();
//   const frame = useCurrentFrame();

//   const totalFrames = durationInSeconds * fps;
//   const loopDuration = 5 * fps; // 5 seconds loop
//   const loopedFrame = frame % loopDuration;
//   const loopCount = Math.floor(frame / loopDuration);

//   const renderEffect = (scene: { zoom: number; rotation: number }) => {
//     const props = {
//       src: fileUrl,
//       isVideo,
//       volume: audioVolume,
//       title: adTitle,
//       subtitle: adDescription,
//       zoom: scene.zoom,
//       rotation: scene.rotation,
//       backgroundColor,
//       durationInFrames: loopDuration,
//       frame: loopedFrame,
//       loopCount,
//     };

//     switch (presentationType) {
//       case 'angled':
//         return <AngledPresentation {...props} />;
//       case 'quickTeaser':
//         return <QuickTeaser {...props} />;
//       case 'laptop':
//         return <Laptop {...props} />;
//       case 'dynamicShowcase':
//         // @ts-ignore
//         return <DynamicShowcase {...props} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div
//       style={{
//         width: '100%',
//         height: '100%',
//         backgroundColor,
//         backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <AbsoluteFill style={{ backgroundColor }}>
//         {scenes.length > 0 ? (
//           scenes.map((scene, index) => (
//             <Sequence key={index} durationInFrames={scene.duration * fps} from={index * scene.duration * fps}>
//               {renderEffect(scene)}
//             </Sequence>
//           ))
//         ) : (
//           <Sequence durationInFrames={totalFrames}>
//             {renderEffect({ zoom: 100, rotation: 0 })}
//           </Sequence>
//         )}
//       </AbsoluteFill>
//     </div>
//   )
// }

// export default MyComposition;








// import React from 'react'
// import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion'
// import { AngledPresentation } from './templates/AngledPresentation'
// import { QuickTeaser } from './templates/QuickTeaser'
// import { Laptop } from './templates/Laptop'
// import { DynamicShowcase } from './templates/DynamicShowcase'

// interface Scene {
//   duration: number;
//   zoom: number;
//   rotation: number;
//   text: string;
// }

// interface CompositionProps {
//   scenes?: Scene[];
//   fileUrl?: string;
//   isVideo?: boolean;
//   presentationType?: 'angled' | 'quickTeaser' | 'laptop' | 'dynamicShowcase';
//   audioVolume?: number;
//   adTitle?: string;
//   adDescription?: string;
//   backgroundColor: string;
//   backgroundImage: string | null;
//   durationInSeconds: number;
// }

// const MyComposition: React.FC<CompositionProps> = ({
//   scenes = [],
//   fileUrl = '',
//   isVideo = false,
//   presentationType = 'angled',
//   audioVolume = 1,
//   adTitle = '',
//   adDescription = '',
//   backgroundColor = '#ffffff',
//   backgroundImage,
//   durationInSeconds,
// }) => {
//   const { fps } = useVideoConfig();

//   const totalFrames = durationInSeconds * fps;

//   const renderEffect = (scene: { zoom: number; rotation: number }, sceneDuration: number) => {
//     const props = {
//       src: fileUrl,
//       isVideo,
//       volume: audioVolume,
//       title: adTitle,
//       subtitle: adDescription,
//       zoom: scene.zoom,
//       rotation: scene.rotation,
//       backgroundColor,
//       durationInFrames: sceneDuration,
//     };

//     switch (presentationType) {
//       case 'angled':
//         return <AngledPresentation {...props} />;
//       case 'quickTeaser':
//         // @ts-ignore
//         return <QuickTeaser {...props} />;
//       case 'laptop':
//         return <Laptop {...props} />;
//       case 'dynamicShowcase':
//         // @ts-ignore
//         return <DynamicShowcase {...props} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div
//       style={{
//         width: '100%',
//         height: '100%',
//         backgroundColor,
//         backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <AbsoluteFill style={{ backgroundColor }}>
//         {scenes.length > 0 ? (
//           scenes.map((scene, index) => (
//             <Sequence key={index} durationInFrames={scene.duration * fps} from={index * scene.duration * fps}>
//               {renderEffect(scene, scene.duration * fps)}
//             </Sequence>
//           ))
//         ) : (
//           <Sequence durationInFrames={totalFrames}>
//             {renderEffect({ zoom: 100, rotation: 0 }, totalFrames)}
//           </Sequence>
//         )}
//       </AbsoluteFill>
//     </div>
//   )
// }

// export default MyComposition;




// MyComposition.tsx
import React from 'react'
import { AbsoluteFill, Sequence, useVideoConfig, useCurrentFrame } from 'remotion'
import { AngledPresentation } from './templates/AngledPresentation'
import { QuickTeaser } from './templates/QuickTeaser'
import { Laptop } from './templates/Laptop'
import { DynamicShowcase } from './templates/DynamicShowcase'
import { FloatingSpotlight } from './templates/FloatingSpotlight'

interface Scene {
  duration: number;
  zoom: number;
  rotation: number;
  text: string;
}

interface CompositionProps {
  scenes?: Scene[];
  fileUrl?: string;
  isVideo?: boolean;
  presentationType?: 'angled' | 'quickTeaser' | 'laptop' | 'dynamicShowcase' | 'floatingSpotlight';
  audioVolume?: number;
  adTitle?: string;
  adDescription?: string;
  backgroundColor: string;
  backgroundImage: string | null;
  durationInSeconds: number;
}

const MyComposition: React.FC<CompositionProps> = ({
  scenes = [],
  fileUrl = '',
  isVideo = false,
  presentationType = 'angled',
  audioVolume = 1,
  adTitle = '',
  adDescription = '',
  backgroundColor = '#ffffff',
  backgroundImage,
  durationInSeconds,
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const totalFrames = durationInSeconds * fps;
  const loopDuration = 5 * fps; // 5 seconds loop
  const loopedFrame = frame % loopDuration;
  const loopCount = Math.floor(frame / loopDuration);

  const renderEffect = (scene: { zoom: number; rotation: number }) => {
    const props = {
      media: fileUrl,
      isVideo,
      volume: audioVolume,
      title: adTitle,
      subtitle: adDescription,
      zoom: scene.zoom,
      rotation: scene.rotation,
      backgroundColor,
      durationInFrames: loopDuration,
      frame: loopedFrame,
      loopCount,
    };

    switch (presentationType) {
      case 'angled':
        return <AngledPresentation {...props} />;
      case 'quickTeaser':
        return <QuickTeaser {...props} />;
      case 'laptop':
        return <Laptop {...props} />;
      case 'dynamicShowcase':
        return <DynamicShowcase {...props} />;
      case 'floatingSpotlight':
        return <FloatingSpotlight {...props} />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <AbsoluteFill style={{ backgroundColor }}>
        {scenes.length > 0 ? (
          scenes.map((scene, index) => (
            <Sequence key={index} durationInFrames={scene.duration * fps} from={index * scene.duration * fps}>
              {renderEffect(scene)}
            </Sequence>
          ))
        ) : (
          <Sequence durationInFrames={totalFrames}>
            {renderEffect({ zoom: 100, rotation: 0 })}
          </Sequence>
        )}
      </AbsoluteFill>
    </div>
  );
};

export default MyComposition;
