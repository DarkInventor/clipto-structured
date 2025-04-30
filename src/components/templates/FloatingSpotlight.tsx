import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, Img, Video, Easing } from 'remotion';

interface FloatingSpotlightProps {
  media: string;
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

export const FloatingSpotlight: React.FC<FloatingSpotlightProps> = ({
  media,
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
  const baseDuration = 6 * 60; // 6 seconds at 60fps
  const loopedFrame = frame % baseDuration;

  const keyframes = useMemo(() => {
    return {
      0: {
        scale: 1,
        translateY: 0,
        translateX: 0,
        rotate: 0,
        opacity: 0.8,
        spotlightSize: 120,
        spotlightX: 50,
        spotlightY: 50,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      },
      60: {
        scale: 1.2,
        translateY: -20,
        translateX: 30,
        rotate: 2,
        opacity: 1,
        spotlightSize: 150,
        spotlightX: 60,
        spotlightY: 40,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      },
      180: {
        scale: 1.1,
        translateY: 20,
        translateX: -30,
        rotate: -2,
        opacity: 0.9,
        spotlightSize: 130,
        spotlightX: 40,
        spotlightY: 60,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      },
      300: {
        scale: 1.3,
        translateY: 0,
        translateX: 0,
        rotate: 0,
        opacity: 1,
        spotlightSize: 160,
        spotlightX: 50,
        spotlightY: 50,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      },
      360: {
        scale: 1,
        translateY: 0,
        translateX: 0,
        rotate: 0,
        opacity: 0.8,
        spotlightSize: 120,
        spotlightX: 50,
        spotlightY: 50,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      },
    };
  }, []);

  const currentFromKeyframe = useMemo(() => {
    const keyframeValues = Object.values(keyframes);
    const keyframeFrames = Object.keys(keyframes).map(Number);
    
    const currentIndex = keyframeFrames.findIndex(f => f > loopedFrame) - 1;
    const safeIndex = Math.max(0, currentIndex);
    
    if (safeIndex === keyframeFrames.length - 1) {
      return keyframeValues[safeIndex];
    }
    
    const currentFrame = keyframeFrames[safeIndex];
    const nextFrame = keyframeFrames[safeIndex + 1];
    const currentKeyframe = keyframeValues[safeIndex];
    const nextKeyframe = keyframeValues[safeIndex + 1];
    
    return {
      scale: interpolate(loopedFrame, [currentFrame, nextFrame], [currentKeyframe.scale, nextKeyframe.scale]),
      translateY: interpolate(loopedFrame, [currentFrame, nextFrame], [currentKeyframe.translateY, nextKeyframe.translateY]),
      translateX: interpolate(loopedFrame, [currentFrame, nextFrame], [currentKeyframe.translateX, nextKeyframe.translateX]),
      rotate: interpolate(loopedFrame, [currentFrame, nextFrame], [currentKeyframe.rotate, nextKeyframe.rotate]),
      opacity: interpolate(loopedFrame, [currentFrame, nextFrame], [currentKeyframe.opacity, nextKeyframe.opacity]),
      spotlightSize: interpolate(loopedFrame, [currentFrame, nextFrame], [currentKeyframe.spotlightSize, nextKeyframe.spotlightSize]),
      spotlightX: interpolate(loopedFrame, [currentFrame, nextFrame], [currentKeyframe.spotlightX, nextKeyframe.spotlightX]),
      spotlightY: interpolate(loopedFrame, [currentFrame, nextFrame], [currentKeyframe.spotlightY, nextKeyframe.spotlightY]),
    };
  }, [loopedFrame, keyframes]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '90%',
          height: '90%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `
            scale(${currentFromKeyframe.scale * (zoom / 100)})
            translateY(${currentFromKeyframe.translateY}px)
            translateX(${currentFromKeyframe.translateX}px)
            rotate(${currentFromKeyframe.rotate + rotation}deg)
          `,
          opacity: currentFromKeyframe.opacity,
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `radial-gradient(
              circle at ${currentFromKeyframe.spotlightX}% ${currentFromKeyframe.spotlightY}%,
              rgba(255, 255, 255, 0.3) 0%,
              rgba(0, 0, 0, 0.8) ${currentFromKeyframe.spotlightSize}%
            )`,
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 0 50px rgba(255, 255, 255, 0.2)',
          }}
        >
          {isVideo ? (
            <Video
              src={media}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              volume={volume}
            />
          ) : (
            <Img
              src={media}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '10%',
          right: '10%',
          textAlign: 'center',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          zIndex: 3,
        }}
      >
        <h1 style={{ fontSize: '3em', marginBottom: '0.5em' }}>{title}</h1>
        <h2 style={{ fontSize: '1.5em' }}>{subtitle}</h2>
      </div>
    </AbsoluteFill>
  );
}; 