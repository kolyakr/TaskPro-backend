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

  app.use(express.json());
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
  );
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(cookieParser());

  app.use(rootRouter);

  app.use(notFound);
  app.use(errorHandler);

  const PORT = env(ENV.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};
