import { RequestHandler } from 'express';

export const notFound: RequestHandler = (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API Endpoint Not Found !!',
    errorSources: [
      {
        path: req.originalUrl,
        message: 'The requested path does not exist on this server.',
      },
    ],
  });
};