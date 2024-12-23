import mongoose from 'mongoose';
import { env } from '../utils/env.js';
import { ENV } from '../constants.js';
import createHttpError from 'http-errors';

export const initMongoConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${env(ENV.MONGO_NAME)}:${env(ENV.MONGO_PASSWORD)}@${env(
        ENV.MONGO_URL,
      )}/${env(ENV.MONGO_DB)}?retryWrites=true&w=majority&appName=Cluster0`,
    );

    console.log('MongoDB is established successfully');
  } catch {
    throw createHttpError(500, 'Error while MongoDB was establishing');
  }
};
