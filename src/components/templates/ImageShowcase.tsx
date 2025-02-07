"use client"

import type React from "react"
import { useMemo } from "react"
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring, Img, Video } from "remotion"

interface ImageShowcaseProps {
  media: string
  isVideo: boolean
  volume: number
  title: string
  subtitle: string
  zoom: number
  rotation: number
  backgroundColor: string
  durationInFrames: number
  frame: number
  loopCount: number
}

const AnimatedText: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const characters = useMemo(() => text.split(""), [text])

  return (
    <div className="flex justify-center">
      {characters.map((char, index) => {
        const charDelay = delay + index * 2
        const progress = spring({
          frame: frame - charDelay,
          fps,
          config: { damping: 60, mass: 0.3 },
        })

        return (
          <span
            key={index}
            className="inline-block text-[2em] text-yellow-500 font-semibold leading-7"
            style={{
              opacity: progress,
              transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
            }}
            
          >
            {char}
          </span>
        )
      })}
    </div>
  )
}

const LinearGradient: React.FC<{
  from: string
  to: string
  style?: React.CSSProperties
}> = ({ from, to, style }) => {
  return (
    <div
      style={{
        ...style,
        background: `linear-gradient(to right, ${from}, ${to})`,
      }}
    />
  )
}

export const ImageShowcase: React.FC<ImageShowcaseProps> = ({
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
}) => {
  const { fps, width, height } = useVideoConfig()

  const progress = spring({
    frame,
    fps,
    config: {
      damping: 100,
      mass: 0.5,
    },
  })

  const scale = interpolate(progress, [0, 1], [0.8, 1.2 * (zoom / 100)])
  const rotationY = interpolate(frame, [0, durationInFrames], [-100, 30])
  const shadowBlur = interpolate(progress, [0, 1], [0, 20])
  const shadowOpacity = interpolate(progress, [0, 1], [0, 0.5])
  const posX = interpolate(frame, [0, durationInFrames / 2, durationInFrames], [-150, 200, -150])
  const posY = interpolate(frame, [0, durationInFrames / 2, durationInFrames], [-130, 200, -230])
  const skewX = interpolate(frame, [0, durationInFrames / 2, durationInFrames], [0, 35, 0])
  const tintOpacity = interpolate(frame, [0, durationInFrames / 2, durationInFrames], [0, 0.3, 0])
  const blurAmount = interpolate(frame, [0, durationInFrames / 2, durationInFrames], [5, 0, 5])
  const maskSize = interpolate(progress, [0, 1], [0, Math.sqrt(width * width + height * height)])

  // New highlight effect
  const highlightProgress = interpolate(frame, [0, durationInFrames], [0, 1])
  const highlightPosition = interpolate(highlightProgress, [0, 1], [-100, 100])

  return (
    <AbsoluteFill className="overflow-hidden" style={{ backgroundColor }}>
      {/* Blurred background */}
      <AbsoluteFill className="filter blur-md scale-110 opacity-50">
        {isVideo ? (
          <Video src={media || "/placeholder.svg"} className="w-full h-full object-cover" />
        ) : (
          <Img src={media} className="w-full h-full object-cover" />
        )}
      </AbsoluteFill>

      {/* Main content */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `
            translate(-50%, -50%)
            translate(${posX}px, ${posY}px)
            scale(${scale})
            rotateY(${rotationY + rotation}deg)
            skew(${skewX}deg, 0deg)
          `,
          boxShadow: `0 ${shadowBlur}px 30px rgba(0, 0, 0, ${shadowOpacity})`,
        }}
      >
        <div
          className="overflow-hidden rounded-lg relative"
          style={{
            maskImage: `radial-gradient(circle at center, black ${maskSize}px, transparent ${maskSize}px)`,
            WebkitMaskImage: `radial-gradient(circle at center, black ${maskSize}px, transparent ${maskSize}px)`,
          }}
        >
          {isVideo ? (
            <Video src={media} className="w-full h-full object-cover" volume={volume} />
          ) : (
            <Img src={media} className="w-full h-full object-cover" />
          )}
          {/* Tint overlay */}
          <div className="absolute inset-0 bg-blue-500 mix-blend-color" style={{ opacity: tintOpacity }} />
          {/* Highlight effect */}
          <LinearGradient
            from="rgba(255, 255, 255, 0)"
            to="rgba(255, 255, 255, 0.8)"
            style={{
              position: "absolute",
              top: 0,
              left: `${highlightPosition}%`,
              width: "50%",
              height: "100%",
              transform: "skew(-45deg)",
              opacity: 0.5,
              mixBlendMode: "overlay",
            }}
          />
        </div>
      </div>

      {/* Text content */}
      <div className="absolute bottom-[10%] left-[10%] right-[10%] text-center">
        <h1 className="text-4xl text-white text-shadow-lg">
          <AnimatedText text={title} delay={30} />
        </h1>
        <h2 className="text-2xl text-white text-shadow-md mt-4">
          <AnimatedText text={subtitle} delay={60} />
        </h2>
      </div>
    </AbsoluteFill>
  )
}

