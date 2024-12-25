import path from 'path';

export const ENV = {
  PORT: 'PORT',
  MONGO_NAME: 'MONGO_NAME',
  MONGO_PASSWORD: 'MONGO_PASSWORD',
  MONGO_URL: 'MONGO_URL',
  MONGO_DB: 'MONGO_DB',
  CLOUD_NAME: 'CLOUD_NAME',
  CLOUD_SECRET: 'CLOUD_SECRET',
  CLOUD_KEY: 'CLOUD_KEY',
};

export const priorities = {
  withoutPriority: 'without priority',
  low: 'low',
  medium: 'medium',
  high: 'high',
};

export const AVATARS_DIRECTION = path.join(
  process.cwd(),
  'src',
  'temp',
  'avatars',
);

export const TEMP_DIRECTION = path.join(process.cwd(), 'src', 'temp');
