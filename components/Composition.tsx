// import React from 'react'
// import { AbsoluteFill, Sequence } from 'remotion'
// import { AngledPresentation } from './AngledPresentation'
// import { QuickTeaser } from './QuickTeaser'
// import { Laptop } from './Laptop'
// import { DynamicShowcase } from './DynamicShowcase'

// interface CompositionProps {
//   scenes?: Array<{
//     duration: number;
//     zoom: number;
//     rotation: number;
//     text: string;
//   }>;
//   fileUrl?: string;
//   isVideo?: boolean;
//   presentationType?: 'angled' | 'quickTeaser' | 'laptop' | 'dynamicShowcase';
//   audioVolume?: number;
//   adTitle?: string;
//   adDescription?: string;
//   backgroundColor: string;
//   backgroundImage: string | null;
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
// }) => {
//   const renderEffect = (scene: { zoom: number; rotation: number }) => {
//     const props = {
//       media: fileUrl,
//       isVideo,
//       volume: audioVolume,
//       title: adTitle,
//       subtitle: adDescription,
//       zoom: scene.zoom,
//       rotation: scene.rotation,
//       backgroundColor,
//     };

//     switch (presentationType) {
//       case 'angled':
//          // @ts-ignore
//         return <AngledPresentation {...props} />;
//       case 'quickTeaser':
//         return <QuickTeaser {...props} />;
//       case 'laptop':
//         return <Laptop {...props} />;
//       case 'dynamicShowcase':
//         return <DynamicShowcase {...props} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div
//     style={{
//       width: '100%',
//       height: '100%',
//       backgroundColor,
//       backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//     }}
//   >
//     <AbsoluteFill style={{ backgroundColor }}>
//       {scenes.length > 0 ? (
//         scenes.map((scene, index) => (
//           <Sequence key={index} durationInFrames={scene.duration * 30} from={index * scene.duration * 30}>
//             {renderEffect(scene)}
//           </Sequence>
//         ))
//       ) : (
//         <Sequence durationInFrames={300}>
//           {renderEffect({ zoom: 100, rotation: 0 })}
//         </Sequence>
//       )}
//     </AbsoluteFill>
//     </div>
//   )
// }

// export default MyComposition;

// import React from 'react'
// import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion'
// import { AngledPresentation } from './AngledPresentation'
// import { QuickTeaser } from './QuickTeaser'
// import { Laptop } from './Laptop'
// import { DynamicShowcase } from './DynamicShowcase'

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
// }) => {
//   const { durationInFrames } = useVideoConfig();

//   const renderEffect = (scene: { zoom: number; rotation: number }) => {
//     const props = {
//       media: fileUrl,
//       isVideo,
//       volume: audioVolume,
//       title: adTitle,
//       subtitle: adDescription,
//       zoom: scene.zoom,
//       rotation: scene.rotation,
//       backgroundColor,
//       durationInFrames,
//     };

//     switch (presentationType) {
//       case 'angled':
//         // @ts-ignore
//         return <AngledPresentation {...props} />;
//       case 'quickTeaser':
//         return <QuickTeaser {...props} />;
//       case 'laptop':
//         return <Laptop {...props} />;
//       case 'dynamicShowcase':
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
//             <Sequence key={index} durationInFrames={scene.duration * 60} from={index * scene.duration * 60}>
//               {renderEffect(scene)}
//             </Sequence>
//           ))
//         ) : (
//           <Sequence durationInFrames={durationInFrames}>
//             {renderEffect({ zoom: 100, rotation: 0 })}
//           </Sequence>
//         )}
//       </AbsoluteFill>
//     </div>
//   )
// }

// export default MyComposition;

import React from 'react'
import { AbsoluteFill, Sequence, useVideoConfig, useCurrentFrame } from 'remotion'
import { AngledPresentation } from './AngledPresentation'
import { QuickTeaser } from './QuickTeaser'
import { Laptop } from './Laptop'
import { DynamicShowcase } from './DynamicShowcase'
import { ImageShowcase } from './ImageShowcase'


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

  // @ts-ignore
  presentationType?: 'angled' | 'quickTeaser' | 'laptop' | 'dynamicShowcase', 'imageShowcase';
  audioVolume?: number;
  adTitle?: string;
  adDescription?: string;
  backgroundColor: string;
  backgroundImage: string | null;
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
}) => {
  const { durationInFrames, fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const baseDuration = 5 * fps; // 5 seconds in frames
  const loopedFrame = frame % baseDuration;
  const loopCount = Math.floor(frame / baseDuration);

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
      durationInFrames: baseDuration,
      frame: loopedFrame,
      loopCount,
    };

    switch (presentationType) {
      case 'angled':
        // @ts-ignore
        return <AngledPresentation {...props} />;
      case 'quickTeaser':
        return <QuickTeaser {...props} />;
      case 'laptop':
        return <Laptop {...props} />;
      case 'dynamicShowcase':
        return <DynamicShowcase {...props} />;
        // @ts-ignore
      case 'imageShowcase':
          return <ImageShowcase {...props} />;
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
          <Sequence durationInFrames={durationInFrames}>
            {renderEffect({ zoom: 100, rotation: 0 })}
          </Sequence>
        )}
      </AbsoluteFill>
    </div>
  )
}

export default MyComposition;

