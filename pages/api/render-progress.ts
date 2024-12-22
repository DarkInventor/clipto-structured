// import { NextApiRequest, NextApiResponse } from 'next';
// import { getRenderProgress } from '@remotion/lambda/client';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const { renderId } = req.query;
//   console.log('Checking progress for renderId:', renderId);

//   try {
//     const progress = await getRenderProgress({
//       renderId: renderId as string,
//       functionName: process.env.LAMBDA_FUNCTION_NAME!,
//       region: process.env.AWS_REGION as "us-east-1",
//       credentials: {
//         accessKeyId: process.env.REMOTION_AWS_ACCESS_KEY_ID!,
//         secretAccessKey: process.env.REMOTION_AWS_SECRET_ACCESS_KEY!,
//       },
//       bucketName: process.env.BUCKET_NAME!, // Add this line
//     });

//     console.log('Progress:', progress);

//     if (progress.done) {
//       const outputUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${progress.outputFile}`;
//       res.status(200).json({ 
//         ...progress, 
//         outputUrl,
//         done: true 
//       });
//     } else {
//       res.status(200).json(progress);
//     }
//   } catch (error) {
//     console.error('Error checking render progress:', error);
//     res.status(500).json({
//       message: 'Error checking render progress',
//       error: error instanceof Error ? error.message : String(error),
//       renderId,
//       functionName: process.env.LAMBDA_FUNCTION_NAME,
//       bucketName: process.env.BUCKET_NAME, // Add this for debugging
//     });
//   }
// }





import { NextApiRequest, NextApiResponse } from 'next';
import { getRenderProgress } from '@remotion/lambda/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { renderId } = req.query;
  console.log('Checking progress for renderId:', renderId);

  try {
    const progress = await getRenderProgress({
      renderId: renderId as string,
      functionName: process.env.LAMBDA_FUNCTION_NAME!,
      region: process.env.AWS_REGION as "us-east-1",
      bucketName: process.env.BUCKET_NAME!,
      // @ts-ignore
      credentials: {
        accessKeyId: process.env.REMOTION_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.REMOTION_AWS_SECRET_ACCESS_KEY!,
      },
    });

    console.log('Raw progress:', progress);

    if (progress.done && progress.outputFile) {
      const outputUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${progress.outputFile}`;
      console.log('Render complete, output URL:', outputUrl);
      
      res.status(200).json({
        ...progress,
        done: true,
        outputUrl,
        outputFile: progress.outputFile
      });
    } else {
      res.status(200).json({
        ...progress,
        done: false
      });
    }
  } catch (error) {
    console.error('Error checking render progress:', error);
    res.status(500).json({
      message: 'Error checking render progress',
      error: error instanceof Error ? error.message : String(error),
      renderId,
      functionName: process.env.LAMBDA_FUNCTION_NAME,
    });
  }
}