import { User } from '../db/models/User.js';
import bcrypt from 'bcrypt';

export const updateUserProfile = async (payload, userId) => {
  if (payload?.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }

  return await User.findOneAndUpdate(
    {
      _id: userId,
    },
    payload,
    {
      new: true,
    },
  );
};
