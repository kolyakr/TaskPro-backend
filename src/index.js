import createHttpError from 'http-errors';
import { initMongoConnection } from './db/initMongoConnection.js';
import { startServer } from './server.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();
    startServer();
  } catch (err) {
    throw createHttpError(500, 'Error with bootstrap');
  }
};

bootstrap();
