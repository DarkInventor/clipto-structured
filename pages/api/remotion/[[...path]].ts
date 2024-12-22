import { NextApiRequest, NextApiResponse } from 'next';
import { bundle } from '@remotion/bundler';
import { getCompositions } from '@remotion/renderer';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const remotionPath = (req.query.path as string[]) || [];
    console.log('Remotion path:', remotionPath);
    
    if (remotionPath[0] === 'index.html') {
      console.log('Bundling Remotion project...');
      const bundled = await bundle({
        entryPoint: path.join(process.cwd(), 'src', 'remotion', 'entry.ts'),
        webpackOverride: (config) => {
          return {
            ...config,
            resolve: {
              ...config.resolve,
              alias: {
                ...config.resolve?.alias,
                '@': path.join(process.cwd(), 'src'),
              },
            },
          };
        },
      });

      console.log('Getting compositions...');
      const compositions = await getCompositions(bundled);
      console.log('Found compositions:', compositions);
      
      // Send HTML content
      res.setHeader('Content-Type', 'text/html');
      return res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8"/>
          </head>
          <body>
            <div id="root"></div>
            <script>
              window.getStaticCompositions = function() {
                return ${JSON.stringify(compositions)};
              }
            </script>
             <script src="${bundled}"></script>
          </body>
        </html>
      `);
    }

    res.status(404).send('Not found');
  } catch (error) {
    console.error('Error in Remotion handler:', error);
    res.status(500).json({
      message: 'Error serving Remotion bundle',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}