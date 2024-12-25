import nodemailer from 'nodemailer';
import { env } from './env.js';
import { ENV } from '../constants.js';

const transporter = nodemailer.createTransport({
  host: env(ENV.MAIL_HOST),
  port: env(ENV.MAIL_PORT),
  secure: false,
  auth: {
    user: env(ENV.MAIL_USER),
    pass: env(ENV.MAIL_PASS),
  },
});

export const sendEmail = async (options) => {
  return transporter.sendMail(options);
};
