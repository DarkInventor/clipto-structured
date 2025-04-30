import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, useVideoConfig, spring } from 'remotion';

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

interface KeyframeProps {
  scale: number;
  translateX: number;
  translateY: number;
  rotateX: number;
  rotateY: number;
  rotate: number;
  spotlightOpacity: number;
  spotlightSize: number;
  spotlightY: number;
  spotlightX: number;
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
  const { fps } = useVideoConfig();

  // Calculate phase durations based on total duration
  const phases = useMemo(() => {
    const totalFrames = durationInFrames;
    if (totalFrames <= fps * 5) { // 5-second version
      return {
        buildDuration: fps * 1, // 1s
        holdDuration: fps * 2,  // 2s
        exitDuration: fps * 2,  // 2s
      };
    } else if (totalFrames <= fps * 10) { // 10-second version
      return {
        buildDuration: fps * 2, // 2s
        holdDuration: fps * 5,  // 5s
        exitDuration: fps * 3,  // 3s
      };
    } else if (totalFrames <= fps * 30) { // 30-second version
      return {
        buildDuration: fps * 4,  // 4s
        holdDuration: fps * 18,  // 18s
        exitDuration: fps * 8,   // 8s
      };
    } else { // 60-second version
      return {
        buildDuration: fps * 6,  // 6s
        holdDuration: fps * 42,  // 42s
        exitDuration: fps * 12,  // 12s
      };
    }
  }, [fps, durationInFrames]);

  const getPhase = (frame: number) => {
    if (frame < phases.buildDuration) return 'build';
    if (frame < phases.buildDuration + phases.holdDuration) return 'hold';
    return 'exit';
  };

  const getSpotlightAnimation = (frame: number) => {
    const phase = getPhase(frame);
    const totalDuration = durationInFrames;
    
    // Base values
    let opacity = 0;
    let size = 100;
    let y = 50;
    let x = 50;
    let scale = 1;
    
    if (phase === 'build') {
      // Fade in and rise from bottom with camera movement
      const progress = frame / phases.buildDuration;
      const easeProgress = spring({
        frame: progress * phases.buildDuration,
        fps,
        from: 0,
        to: 1,
        config: { damping: 12, mass: 0.5, stiffness: 100 }
      });
      
      opacity = interpolate(easeProgress, [0, 1], [0, 1], { extrapolateRight: 'clamp' });
      y = interpolate(easeProgress, [0, 1], [80, 50], { extrapolateRight: 'clamp' });
      size = interpolate(easeProgress, [0, 1], [80, 100], { extrapolateRight: 'clamp' });
      scale = interpolate(easeProgress, [0, 1], [1, totalDuration <= fps * 10 ? 1.05 : 1.08], { extrapolateRight: 'clamp' });
    } else if (phase === 'hold') {
      const holdFrame = frame - phases.buildDuration;
      const holdProgress = holdFrame / phases.holdDuration;
      
      opacity = 1;
      scale = totalDuration <= fps * 10 ? 1.05 : 1.08;
      
      // Add hover animation
      const hoverAmount = totalDuration <= fps * 5 ? 5 : // 5s version: ±5px
                         totalDuration <= fps * 10 ? 10 : // 10s version: ±10px
                         totalDuration <= fps * 30 ? 15 : // 30s version: ±15px
                         20; // 60s version: ±20px
      
      const hoverFreq = totalDuration <= fps * 5 ? 1 : // 5s version: 1Hz
                       totalDuration <= fps * 10 ? 0.5 : // 10s version: 0.5Hz
                       totalDuration <= fps * 30 ? 0.25 : // 30s version: 0.25Hz
                       0.15; // 60s version: 0.15Hz
      
      y = 50 + Math.sin(holdProgress * Math.PI * 2 * hoverFreq) * hoverAmount;
      
      // Add rotation for 10s+ versions
      if (totalDuration > fps * 5) {
        rotation += Math.sin(holdProgress * Math.PI) * 2;
      }
      
      // Add pulse animations for longer durations
      if (totalDuration > fps * 10) {
        const pulsePoints = totalDuration <= fps * 30 ? 
          [0.67, 0.89] : // 30s version: two pulses
          [0.5, 0.71, 0.86]; // 60s version: three pulses
        
        const isPulseFrame = pulsePoints.some(point => 
          Math.abs(holdProgress - point) < 0.05
        );
        
        if (isPulseFrame) {
          size = totalDuration <= fps * 30 ? 120 : 125;
          scale *= 1.1;
        }
      }
      
      // Add horizontal drift for longer durations
      if (totalDuration >= fps * 30) {
        const driftProgress = (holdProgress * Math.PI * 2) % (Math.PI * 2);
        x = 50 + Math.sin(driftProgress) * 20;
      }
    } else { // exit phase
      const exitProgress = (frame - (phases.buildDuration + phases.holdDuration)) / phases.exitDuration;
      const easeExitProgress = spring({
        frame: exitProgress * phases.exitDuration,
        fps,
        from: 0,
        to: 1,
        config: { damping: 15, mass: 0.8, stiffness: 80 }
      });
      
      opacity = interpolate(easeExitProgress, [0, 0.5, 1], [1, 0.5, 0], { extrapolateRight: 'clamp' });
      y = interpolate(easeExitProgress, [0, 1], [50, 80], { extrapolateRight: 'clamp' });
      size = interpolate(easeExitProgress, [0, 1], [100, 30], { extrapolateRight: 'clamp' });
      scale = interpolate(easeExitProgress, [0, 1], [totalDuration <= fps * 10 ? 1.05 : 1.08, 1], { extrapolateRight: 'clamp' });
    }
    
    return { opacity, size, x, y, scale };
  };

  const spotlightAnim = getSpotlightAnimation(frame);

  const MediaComponent = isVideo ? 'video' : 'img';

  return (
    <AbsoluteFill style={{ backgroundColor, alignItems: "center", justifyContent: "center", perspective: "1200px" }}>
      <AbsoluteFill style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "2px 2px 20px 5px rgba(0, 0, 0, .2)",
        transform: `
          scale(${spotlightAnim.scale * (zoom / 100)})
          translateX(${spotlightAnim.x - 50}px)
          translateY(${spotlightAnim.y - 50}px)
          rotate(${rotation}deg)
        `,
        width: "max-content",
        height: "max-content",
        margin: "auto",
        maxWidth: "1400px",
        borderRadius: "30px",
        overflow: "hidden",
        backgroundColor,
        transition: 'transform 0.1s ease-out',
      }}>
        <MediaComponent
          src={media}
          style={{
            width: "100%",
            height: "100%",
            minWidth: "1400px",
            objectFit: "cover",
            backgroundColor,
            filter: `brightness(${1 + spotlightAnim.opacity * 0.2}) contrast(${1 + spotlightAnim.opacity * 0.1})`,
          }}
          {...(isVideo ? { 
            autoPlay: true, 
            loop: true, 
            muted: true, 
            volume,
            playsInline: true,
          } : {})}
        />

        {/* Main Spotlight */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(
              circle at ${spotlightAnim.x}% ${spotlightAnim.y}%,
              rgba(255, 255, 255, ${spotlightAnim.opacity}) 0%,
              rgba(0, 0, 0, 0.7) ${spotlightAnim.size}%
            )
          `,
          mixBlendMode: 'overlay',
          transition: 'background 0.1s ease-out',
        }} />

        {/* Ambient Light */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(
              circle at 50% 50%,
              rgba(255, 255, 255, ${spotlightAnim.opacity * 0.3}) 0%,
              transparent 100%
            )
          `,
          mixBlendMode: 'screen',
        }} />

        {/* Vignette Effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(
              circle at 50% 50%,
              transparent 40%,
              rgba(0, 0, 0, ${0.3 * spotlightAnim.opacity}) 100%
            )
          `,
          pointerEvents: 'none',
        }} />
      </AbsoluteFill>

      {/* Text Container */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '10%',
        right: '10%',
        textAlign: 'center',
        transform: `translateY(${(spotlightAnim.y - 50) / 2}px)`,
        opacity: spotlightAnim.opacity,
      }}>
        <h1 style={{ 
          fontSize: '3.5em',
          color: 'white',
          textShadow: '2px 2px 20px rgba(0,0,0,0.7)',
          marginBottom: '0.3em',
          fontWeight: 600,
        }}>{title}</h1>
        <h2 style={{ 
          fontSize: '1.8em',
          color: 'rgba(255, 255, 255, 0.9)',
          textShadow: '2px 2px 10px rgba(0,0,0,0.5)',
          fontWeight: 400,
        }}>{subtitle}</h2>
      </div>
    </AbsoluteFill>
  );
}; 