import React from 'react'
import { AbsoluteFill, Sequence, useVideoConfig, useCurrentFrame } from 'remotion'
import { AngledPresentation } from './AngledPresentation'
import { QuickTeaser } from './QuickTeaser'
import { Laptop } from './Laptop'
import { DynamicShowcase } from './DynamicShowcase'
import { FloatingSpotlight } from './FloatingSpotlight'

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

  const totalFrames = durationInSeconds * fps;

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

