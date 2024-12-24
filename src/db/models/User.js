import { model, Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  theme: {
    type: String,
    enum: ['light', 'dark', 'violet'],
    required: true,
  },
});

export const User = model('users', UserSchema);
