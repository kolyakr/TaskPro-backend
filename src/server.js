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

  app.use((req, res, next) => {
    console.log('📌 Новий запит:', req.method, req.url);
    console.log('🔹 Origin:', req.headers.origin || 'N/A');
    console.log('🔹 Cookies:', req.cookies || 'N/A');
    next();
  });

  const allowedOrigins = [
    process.env.FRONTEND_URL_DEV,
    process.env.FRONTEND_URL_PROD,
  ];

  app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    );
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204);
  });

  app.use(
    cors({
      origin: (origin, callback) => {
        console.log('🌍 CORS перевіряє Origin:', origin);

        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          console.error('❌ Заборонений Origin:', origin);
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      optionsSuccessStatus: 204,
    }),
  );

  app.use(cookieParser());
  app.use(express.json({ limit: '10mb' }));

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
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
