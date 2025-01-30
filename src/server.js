import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pino from 'pino-http';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { rootRouter } from './routes/index.js';
import cookieParser from 'cookie-parser';

dotenv.config();

export const startServer = () => {
  const app = express();

  const isProduction = process.env.NODE_ENV === 'production';

  const allowedOrigins = isProduction
    ? [process.env.FRONTEND_URL_PROD]
    : [process.env.FRONTEND_URL_DEV];

  app.use((req, res, next) => {
    console.log('📌 Новий запит:', req.method, req.url);
    console.log('🔹 Origin:', req.headers.origin || 'N/A');
    console.log('🔹 Cookies:', req.cookies || 'N/A');
    next();
  });

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
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );

  app.use(rootRouter);

  app.use(notFound);

  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(
      `🚀 Сервер працює на порту ${PORT} у режимі ${process.env.NODE_ENV}`,
    );
  });
};
