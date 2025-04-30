// import React from 'react'
// import { AbsoluteFill, useCurrentFrame, interpolate, Img, Video } from 'remotion'

// interface QuickTeaserProps {
//   media: string;
//   isVideo: boolean;
//   volume: number;
//   title: string;
//   subtitle: string;
//   zoom: number;
//   rotation: number;
//   backgroundColor: string;
// }

// export const QuickTeaser: React.FC<QuickTeaserProps> = ({
//   media,
//   isVideo,
//   volume,
//   title,
//   subtitle,
//   zoom,
//   rotation,
//   backgroundColor,
// }) => {
//   const frame = useCurrentFrame()
  
//   const scale = interpolate(frame, [0, 30], [0.8, 1]) * (zoom / 100)
//   const rotate = interpolate(frame, [0, 60], [0, rotation])

//   return (
//     <AbsoluteFill style={{ backgroundColor, alignItems: "center", justifyContent: "center" }}>
//       <div style={{
//         transform: `scale(${scale}) rotate(${rotate}deg)`,
//         width: '80%',
//         height: '80%',
//         overflow: 'hidden',
//         borderRadius: '20px',
//         boxShadow: '0 0 20px rgba(0, 0, 0, .2)',
//         backgroundColor,
//       }}>
//         {isVideo ? (
//           <Video src={media} style={{ width: "100%", height: "100%", objectFit: "cover", backgroundColor }} volume={volume} />
//         ) : (
//           <Img src={media} style={{ width: "100%", height: "100%", objectFit: "cover", backgroundColor }} />
//         )}
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
//   )
// }




import React, { useMemo } from 'react'
import { AbsoluteFill, interpolate, useVideoConfig } from 'remotion'

interface QuickTeaserProps {
  src: string;
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

export const QuickTeaser: React.FC<QuickTeaserProps> = ({
  src,
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
  const { fps } = useVideoConfig();

  const keyframes = useMemo(() => ({
    0: { rotateX: 8, rotateY: 20, rotate: -5, scale: 2, translateX: 420, translateY: 400 },
    30: { rotateX: 8, rotateY: 20, rotate: -5, scale: 2, translateX: 450, translateY: 150 },
    31: { rotateX: 0, rotateY: -20, rotate: 0, scale: 1.8, translateX: 10, translateY: 150 },
    90: { rotateX: 0, rotateY: -20, rotate: 0, scale: 1.8, translateX: 10, translateY: -170 },
    91: { rotateX: 0, rotateY: 0, rotate: 0, scale: 1.1, translateX: 0, translateY: 60 },
    150: { rotateX: 0, rotateY: 0, rotate: 0, scale: 1, translateX: 0, translateY: 40 },
  }), []);

  const currentFromKeyframe = useMemo(() => {
    const keyframeValues = Object.values(keyframes);
    const keyframeFrames = Object.keys(keyframes).map(Number);
    const [currentBaseFrameIndex, currentBaseFrame] = keyframeFrames.reduce(
      ([lastIndex, makeshiftCurrentFrame], toBeCheckedFrame, index) =>
        toBeCheckedFrame <= frame ? [index, toBeCheckedFrame] : [lastIndex, makeshiftCurrentFrame],
      [0, 0]
    );
    
    if (!keyframeValues[currentBaseFrameIndex + 1]) return keyframeValues[currentBaseFrameIndex];
    
    const nextKeyframe = keyframeValues[currentBaseFrameIndex + 1];
    const currentKeyframe = keyframeValues[currentBaseFrameIndex];
    
    return {
      rotateX: interpolate(frame, [currentBaseFrame, keyframeFrames[currentBaseFrameIndex + 1]], [currentKeyframe.rotateX, nextKeyframe.rotateX]),
      rotateY: interpolate(frame, [currentBaseFrame, keyframeFrames[currentBaseFrameIndex + 1]], [currentKeyframe.rotateY, nextKeyframe.rotateY]),
      rotate: interpolate(frame, [currentBaseFrame, keyframeFrames[currentBaseFrameIndex + 1]], [currentKeyframe.rotate, nextKeyframe.rotate]),
      scale: interpolate(frame, [currentBaseFrame, keyframeFrames[currentBaseFrameIndex + 1]], [currentKeyframe.scale, nextKeyframe.scale]),
      translateX: interpolate(frame, [currentBaseFrame, keyframeFrames[currentBaseFrameIndex + 1]], [currentKeyframe.translateX, nextKeyframe.translateX]),
      translateY: interpolate(frame, [currentBaseFrame, keyframeFrames[currentBaseFrameIndex + 1]], [currentKeyframe.translateY, nextKeyframe.translateY]),
    }
  }, [frame, keyframes]);

  const MediaComponent = isVideo ? 'video' : 'img';

  return (
    <AbsoluteFill style={{ backgroundColor, alignItems: "center", justifyContent: "center", perspective: "1200px" }}>
      <AbsoluteFill style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "2px 2px 20px 5px rgba(0, 0, 0, .2)",
        transform: `
          scale(${currentFromKeyframe.scale * (zoom / 100)})
          translateX(${currentFromKeyframe.translateX}px)
          translateY(${currentFromKeyframe.translateY}px)
          rotateX(${currentFromKeyframe.rotateX}deg)
          rotateY(${currentFromKeyframe.rotateY}deg)
          rotate(${currentFromKeyframe.rotate + rotation}deg)
        `,
        width: "max-content", height: "max-content", margin: "auto", maxWidth: "1400px",
        borderRadius: "30px", overflow: "hidden",
        backgroundColor,
      }}>
        <MediaComponent
          src={src}
          style={{ width: "100%", height: "100%", minWidth: "1400px", objectFit: "cover", backgroundColor }}
          {...(isVideo ? { autoPlay: true, loop: true, muted: true, volume } : {})}
        />
      </AbsoluteFill>
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

