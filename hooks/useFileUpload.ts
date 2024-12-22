import { useState, useRef } from 'react'

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

export function useFileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [isVideo, setIsVideo] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE) {
        alert("Please upload a file smaller than 50MB.")
        return
      }
      if (!selectedFile.type.startsWith('image/') && !selectedFile.type.startsWith('video/')) {
        alert("Please upload an image or video file.")
        return
      }
      setFile(selectedFile)
      const url = URL.createObjectURL(selectedFile)
      setFileUrl(url)
      setIsVideo(selectedFile.type.startsWith('video'))
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return { file, fileUrl, isVideo, handleFileChange, triggerFileInput, fileInputRef }
}

