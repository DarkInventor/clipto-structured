import { useState } from 'react'

export function useAudioSettings() {
  const [audioVolume, setAudioVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)

  const handleVolumeChange = (newVolume: number) => {
    setAudioVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    if (isMuted) {
      setAudioVolume(1)
      setIsMuted(false)
    } else {
      setAudioVolume(0)
      setIsMuted(true)
    }
  }

  return { audioVolume, isMuted, handleVolumeChange, toggleMute }
}

