// import { useState } from 'react';
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// interface RenderProps {
//   composition: string;
//   inputProps: {
//     scenes: any[];
//     fileUrl: string;
//     isVideo: boolean;
//     presentationType: string;
//     audioVolume: number;
//     adTitle: string;
//     adDescription: string;
//   };
//   durationInFrames: number;
//   fps: number;
//   width: number;
//   height: number;
// }

// export function useAWSLambda() {
//   const [isRendering, setIsRendering] = useState(false);
//   const [renderProgress, setRenderProgress] = useState(0);
//   const [renderedVideoUrl, setRenderedVideoUrl] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const uploadToS3 = async (file: File) => {
//     try {
//       const s3 = new S3Client({
//         region: process.env.NEXT_PUBLIC_AWS_REGION,
//         credentials: {
//           accessKeyId: process.env.NEXT_PUBLIC_REMOTION_AWS_ACCESS_KEY_ID!,
//           secretAccessKey: process.env.NEXT_PUBLIC_REMOTION_AWS_SECRET_ACCESS_KEY!,
//         }
//       });

//       const key = `uploads/${Date.now()}-${file.name}`;
//       await s3.send(new PutObjectCommand({
//         Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
//         Key: key,
//         Body: file,
//         ContentType: file.type,
//         ACL: 'public-read', // Make the file publicly accessible
//       }));

//       return `https://${process.env.NEXT_PUBLIC_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${key}`;
//     } catch (err) {
//       console.error('Error uploading to S3:', err);
//       throw new Error('Failed to upload file to S3');
//     }
//   };

//   const renderVideo = async (props: RenderProps) => {
//     try {
//       setIsRendering(true);
//       setRenderProgress(0);
//       setRenderedVideoUrl(null);
//       setError(null);

//       console.log('Starting render with props:', props);

//       // Upload file to S3 if it exists and is a blob URL
//       let s3Url = props.inputProps.fileUrl;
//       if (props.inputProps.fileUrl && props.inputProps.fileUrl.startsWith('blob:')) {
//         console.log('Uploading file to S3...');
//         const file = await fetch(props.inputProps.fileUrl).then(r => r.blob());
//         s3Url = await uploadToS3(new File([file], 'image.jpg', { 
//           type: props.inputProps.isVideo ? 'video/mp4' : 'image/jpeg' 
//         }));
//         console.log('File uploaded to S3:', s3Url);
//       }

//       const response = await fetch('/api/render-video', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...props,
//           inputProps: {
//             ...props.inputProps,
//             fileUrl: s3Url,
//           },
//         }),
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message);
//       }

//       const { renderId } = await response.json();
//       console.log('Render started with ID:', renderId);

//       // Start polling for progress
//       const pollProgress = async () => {
//         try {
//           const progressResponse = await fetch(`/api/render-progress?renderId=${renderId}`);
          
//           if (!progressResponse.ok) {
//             const error = await progressResponse.json();
//             throw new Error(error.message);
//           }

//           const progress = await progressResponse.json();
//           console.log('Progress update:', progress);

//           if (progress.done) {
//             setIsRendering(false);
//             setRenderProgress(1);
//             setRenderedVideoUrl(progress.outputUrl);
//             return;
//           }

//           if (progress.done) {
//             setIsRendering(false);
//             setRenderProgress(1);
//             const outputUrl = `https://${process.env.NEXT_PUBLIC_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${progress.outputFile}`;
//             setRenderedVideoUrl(outputUrl);
//             return;
//           }

//           if (progress.fatalErrorEncountered) {
//             throw new Error(progress.errors?.[0]?.message || 'Rendering failed');
//           }

//           setRenderProgress(progress.overallProgress || 0);
//           setTimeout(pollProgress, 1000);
//         } catch (error) {
//           console.error('Error checking render progress:', error);
//           setIsRendering(false);
//           setRenderProgress(0);
//           setError(error instanceof Error ? error.message : 'Unknown error');
//         }
//       };

//       // Start polling
//       pollProgress();

//     } catch (error) {
//       console.error('Error starting render:', error);
//       setIsRendering(false);
//       setRenderProgress(0);
//       setError(error instanceof Error ? error.message : 'Unknown error');
//     }
//   };

//   return { isRendering, renderProgress, renderedVideoUrl, error, renderVideo };
// }





import { useState } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

interface RenderProps {
  composition: string;
  inputProps: {
    scenes: any[];
    fileUrl: string;
    isVideo: boolean;
    presentationType: string;
    audioVolume: number;
    adTitle: string;
    adDescription: string;
  };
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
}

export function useAWSLambda() {
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [renderedVideoUrl, setRenderedVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadToS3 = async (file: File) => {
    try {
      const s3 = new S3Client({
        region: process.env.NEXT_PUBLIC_AWS_REGION,
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_REMOTION_AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_REMOTION_AWS_SECRET_ACCESS_KEY!,
        }
      });

      const key = `uploads/${Date.now()}-${file.name}`;
      await s3.send(new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
        Key: key,
        Body: file,
        ContentType: file.type,
        ACL: 'public-read',
      }));

      return `https://${process.env.NEXT_PUBLIC_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${key}`;
    } catch (err) {
      console.error('Error uploading to S3:', err);
      throw new Error('Failed to upload file to S3');
    }
  };

  const renderVideo = async (props: RenderProps) => {
    try {
      setIsRendering(true);
      setRenderProgress(0);
      setRenderedVideoUrl(null);
      setError(null);

      console.log('Starting render with props:', props);

      // Upload file to S3 if it exists and is a blob URL
      let s3Url = props.inputProps.fileUrl;
      if (props.inputProps.fileUrl && props.inputProps.fileUrl.startsWith('blob:')) {
        console.log('Uploading file to S3...');
        const file = await fetch(props.inputProps.fileUrl).then(r => r.blob());
        s3Url = await uploadToS3(new File([file], 'image.jpg', { 
          type: props.inputProps.isVideo ? 'video/mp4' : 'image/jpeg' 
        }));
        console.log('File uploaded to S3:', s3Url);
      }

      const response = await fetch('/api/render-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...props,
          inputProps: {
            ...props.inputProps,
            fileUrl: s3Url,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to start render');
      }

      const { renderId } = await response.json();
      console.log('Render started with ID:', renderId);

      // Poll for progress
      const pollProgress = async () => {
        try {
          const progressResponse = await fetch(`/api/render-progress?renderId=${renderId}`);
          if (!progressResponse.ok) {
            throw new Error('Failed to fetch progress');
          }
      
          const progress = await progressResponse.json();
          console.log('Progress update:', progress);
      
          // Check if the render is complete and we have an output file
          if (progress.done && progress.outputFile) {
            // Extract the correct URL path
            const videoUrl = `${progress.outputFile}`;
            console.log('Setting rendered video URL:', videoUrl);
            
            setIsRendering(false);
            setRenderProgress(1);
            setRenderedVideoUrl(videoUrl); // This will trigger the download button to appear
            return;
          }
      
          if (progress.fatalErrorEncountered) {
            throw new Error(progress.errors?.[0]?.message || 'Rendering failed');
          }
      
          setRenderProgress(progress.overallProgress || 0);
          
          if (!progress.done) {
            setTimeout(pollProgress, 1000);
          }
        } catch (error) {
          console.error('Error checking render progress:', error);
          setIsRendering(false);
          setError(error instanceof Error ? error.message : 'Unknown error');
        }
      };

      // Start polling
      pollProgress();

    } catch (error) {
      console.error('Error starting render:', error);
      setIsRendering(false);
      setRenderProgress(0);
      setError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  return { 
    isRendering, 
    renderProgress, 
    renderedVideoUrl, 
    error, 
    renderVideo 
  };
}