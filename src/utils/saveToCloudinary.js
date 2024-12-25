import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';
import { ENV } from '../constants.js';
import fs from 'fs/promises';

const save = async (file) => {
  cloudinary.config({
    cloud_name: env(ENV.CLOUD_NAME),
    api_key: env(ENV.CLOUD_KEY),
    api_secret: env(ENV.CLOUD_SECRET),
  });

  const uploadResult = await cloudinary.uploader.upload(file.path);
  await fs.unlink(file.path);

  return uploadResult.secure_url;
};

export const saveToCloudinary = async (req) => {
  const file = req.file;

  let avatar = null;
  if (file) {
    avatar = await save(file);
  }

  return avatar;
};
