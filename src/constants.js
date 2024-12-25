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
  MAIL_USER: 'MAIL_USER',
  MAIL_PASS: 'MAIL_PASS',
  MAIL_HOST: 'MAIL_HOST',
  MAIL_PORT: 'MAIL_PORT',
  MAIL_FROM: 'MAIL_FROM',
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
