import React from 'react'
import { AbsoluteFill, Sequence } from 'remotion'
import { AngledPresentation } from './templates/AngledPresentation'
import { QuickTeaser } from './templates/QuickTeaser'
import { Laptop } from './templates/Laptop'
import { DynamicShowcase } from './templates/DynamicShowcase'

interface CompositionProps {
  scenes?: Array<{
    duration: number;
    zoom: number;
    rotation: number;
    text: string;
  }>;
  src?: string;  // Changed from fileUrl to src
  isVideo?: boolean;
  presentationType?: 'angled' | 'quickTeaser' | 'laptop' | 'dynamicShowcase';
  audioVolume?: number;
  adTitle?: string;
  adDescription?: string;
  backgroundColor?: string;
}

const MyComposition: React.FC<CompositionProps> = ({
  scenes = [],
  src = '',  // Changed from fileUrl to src
  isVideo = false,
  presentationType = 'angled',
  audioVolume = 1,
  adTitle = '',
  adDescription = '',
  backgroundColor = '#ffffff', 
}) => {
  const renderEffect = (scene: { zoom: number; rotation: number }) => {
    const props = {
      src,  // Changed from media to src
      isVideo,
      volume: audioVolume,
      title: adTitle,
      subtitle: adDescription,
      zoom: scene.zoom,
      rotation: scene.rotation,
      backgroundColor, 
    };

    switch (presentationType) {
      case 'angled':
         // @ts-ignore
        return <AngledPresentation {...props} />;
      case 'quickTeaser':
         // @ts-ignore
        return <QuickTeaser {...props} />;
      case 'laptop':
         // @ts-ignore
        return <Laptop {...props} />;
      case 'dynamicShowcase':
         // @ts-ignore
        return <DynamicShowcase {...props} />;
      default:
        return null;
    }
  };

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      {scenes.length > 0 ? (
        scenes.map((scene, index) => (
          <Sequence key={index} durationInFrames={scene.duration * 30} from={index * scene.duration * 30}>
            {renderEffect(scene)}
          </Sequence>
        ))
      ) : (
        <Sequence durationInFrames={300}>
          {renderEffect({ zoom: 100, rotation: 0 })}
        </Sequence>
      )}
    </AbsoluteFill>
  )
}

export default MyComposition;