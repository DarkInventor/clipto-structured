import React, { useState } from 'react';
import { useAWSLambda } from './hooks/useAWSLambda';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [adTitle, setAdTitle] = useState('');
  const [adDescription, setAdDescription] = useState('');
  // @ts-ignore
  const { renderVideo, renderId, error } = useAWSLambda();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleRender = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    try {
      const inputProps = {
        scenes: [],
        fileUrl: file, // Pass the File object directly
        isVideo: file.type.startsWith('video/'),
        presentationType: 'angled',
        audioVolume: 1,
        adTitle,
        adDescription,
      };

      console.log('Input props:', inputProps);
 // @ts-ignore
      await renderVideo(inputProps);
    } catch (err) {
      console.error('Error in handleRender:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Video Ad Generator</h1>
      <div className="mb-4">
        <Input type="file" onChange={handleFileChange} accept="image/*,video/*" />
      </div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Ad Title"
          value={adTitle}
          onChange={(e) => setAdTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Textarea
          placeholder="Ad Description"
          value={adDescription}
          onChange={(e) => setAdDescription(e.target.value)}
        />
      </div>
      <Button onClick={handleRender}>Render Video</Button>
      {renderId && <p className="mt-4">Render ID: {renderId}</p>}
      {error && <p className="mt-4 text-red-500">Error: {error}</p>}
    </div>
  );
};

export default App;

