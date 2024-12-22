import { NextApiRequest, NextApiResponse } from 'next';
import { renderMediaOnLambda } from '@remotion/lambda/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      composition,
      inputProps,
      durationInFrames,
      fps,
      width,
      height
    } = req.body;

    console.log('Starting render with params:', {
      composition,
      durationInFrames,
      fps,
      width,
      height,
      inputProps
    });

    const renderResponse = await renderMediaOnLambda({
      region: process.env.AWS_REGION as "us-east-1",
      functionName: process.env.LAMBDA_FUNCTION_NAME!,
      serveUrl: `${process.env.REMOTION_SERVE_URL}/index.html`,
      composition: "Clipto",
      inputProps,
      codec: 'h264',
      imageFormat: 'jpeg',
      maxRetries: 3,
      privacy: 'public',
      framesPerLambda: 80,
      outName: `rendered-video-${Date.now()}.mp4`,
      // @ts-ignore
      concurrency: 5,
      frameRange: [0, durationInFrames - 1],
      timeoutInMilliseconds: 180000,
      credentials: {
        accessKeyId: process.env.REMOTION_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.REMOTION_AWS_SECRET_ACCESS_KEY!,
      },
    });

    console.log('Render started with ID:', renderResponse.renderId);
    res.status(200).json({ 
      renderId: renderResponse.renderId,
      bucketName: process.env.BUCKET_NAME 
    });
  } catch (error) {
    console.error('Error starting render:', error);
    res.status(500).json({
      message: 'Error starting render',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}