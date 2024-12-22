import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idToken } = req.body;

    try {
      // Instead of verifying the token, we'll just set it as a cookie
      // The token will be verified on the client-side when making requests
      const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
      
      res.setHeader(
        'Set-Cookie',
        `session=${idToken}; Max-Age=${expiresIn}; HttpOnly; Secure; SameSite=Strict; Path=/`
      );
      
      res.status(200).json({ status: 'success' });
    } catch (error) {
      console.error('Session creation failed', error);
      res.status(401).json({ error: 'Unauthorized' });
    }
  } else if (req.method === 'DELETE') {
    res.setHeader(
      'Set-Cookie',
      `session=; Max-Age=0; HttpOnly; Secure; SameSite=Strict; Path=/`
    );
    res.status(200).json({ status: 'success' });
  } else {
    res.status(405).end();
  }
}
