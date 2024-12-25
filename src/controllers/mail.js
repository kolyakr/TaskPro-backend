import { sendNeedHelpEmail } from '../services/mail.js';

export const sendNeedHelpEmailController = async (req, res) => {
  const payload = req.body;
  const result = await sendNeedHelpEmail(payload);
  console.log(result);

  res.json({
    status: 200,
    message: 'Email was successfully send',
    data: {},
  });
};
