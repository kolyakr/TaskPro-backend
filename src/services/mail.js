import { ENV } from '../constants.js';
import { env } from '../utils/env.js';
import { sendEmail } from '../utils/sendMail.js';

export const sendNeedHelpEmail = async (payload) => {
  return await sendEmail({
    from: env(ENV.MAIL_FROM),
    to: 'mykola.kryvoruchko.oi.2023@lpnu.ua',
    subject: `NeedHelp mail`,
    text: '...',
    html: `
      <h1>NeedHelp mail</h1>
      <p>Comment: ${payload.comment}</p>
      <p>Send answer to ${payload.email}</p>
    `,
  });
};
