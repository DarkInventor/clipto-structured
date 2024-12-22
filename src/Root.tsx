import { Composition } from 'remotion';
import MyComposition from '../components/Composition';
import { aspectRatios } from '../constants';

export const RemotionRoot: React.FC = () => {
  // Default values that match your Player configuration
  const defaultProps = {
    scenes: [
      { duration: 5, zoom: 100, rotation: 0, text: 'Scene 1' },
      { duration: 5, zoom: 110, rotation: 10, text: 'Scene 2' },
    ],
    fileUrl: '', // This will be passed during render
    isVideo: false,
    presentationType: 'angled',
    audioVolume: 1,
    adTitle: 'My new Website',
    adDescription: 'Releasing today!',
    backgroundColor: '#9c3535',
  };

  const defaultAspectRatio = aspectRatios[0]; // Your default aspect ratio

  return (
    <>
      <Composition
        id="Clipto" 
          // @ts-ignore
        component={MyComposition}
        durationInFrames={3600} // This will be overridden by actual duration
        fps={60}
        width={defaultAspectRatio.width}
        height={defaultAspectRatio.height}
        defaultProps={defaultProps}
      />
    </>
  );
};