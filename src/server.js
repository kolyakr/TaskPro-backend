import express from 'express';
import { env } from './utils/env.js';
import cors from 'cors';
import pino from 'pino-http';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { ENV } from './constants.js';
import { rootRouter } from './routes/index.js';
import cookieParser from 'cookie-parser';

export const startServer = () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cookieParser());
  app.use(express.json({ limit: '10mb' }));

  app.use(
    cors({
      origin: 'https://task-pro-frontend-pied.vercel.app',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );

  app.use(rootRouter);

  app.use(notFound);
  app.use(errorHandler);

  const PORT = env(ENV.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};
