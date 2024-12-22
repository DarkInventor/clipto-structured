import React from 'react';
import { Button } from '@/components/ui/button';

interface MediaUploadProps {
  onUpload: (file: File) => void;
}

const MediaUpload: React.FC<MediaUploadProps> = ({ onUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload">
      {/* @ts-ignore */}
        <Button as="span">Upload Media</Button>
      </label>
      <p className="mt-2 text-sm text-gray-500">Drag and drop or click to upload an image or video</p>
    </div>
  );
};

export default MediaUpload;

