import createHttpError from 'http-errors';
import { User } from '../db/models/User.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Session, SessionSchema } from '../db/models/Session.js';

export const registerUser = async (payload) => {
  const isUserExists = await User.findOne({
    email: payload.email,
  });

  if (isUserExists) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.create({ ...payload, password: hashedPassword });

  const { password, ...userInfo } = user._doc;

  return userInfo;
};

export const loginUser = async ({ password, email }) => {
  const user = await User.findOne({
    email: email,
  });

  if (!user) {
    throw createHttpError(404, 'User not found or doesnt exist ');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw createHttpError(401, 'Unauthorized');
  }

  await Session.findOneAndDelete({
    userId: user._id,
  });

  const accessToken = crypto.randomBytes(32).toString('hex');
  const refreshToken = crypto.randomBytes(32).toString('hex');

  const session = await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntill: new Date(Date.now() + 1000 * 60 * 15),
    refreshTokenValidUntill: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  });

  return session;
};

export const logoutUser = async (sessionToken, sessionId) => {
  if (!sessionToken || !sessionId) {
    throw createHttpError(401, 'Cookies not found or doesnt exist');
  }

  return await Session.findOneAndDelete({
    _id: sessionId,
  });
};

export const refreshSession = async (sessionToken, sessionId) => {
  if (!sessionToken || !sessionId) {
    throw createHttpError(401, 'Cookies not found or doesnt exist');
  }

  const session = await Session.findOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });

  if (!session) {
    throw createHttpError(404, 'Session not found');
  }

  const user = await User.findOne({
    _id: session.userId,
  });

  if (!user) {
    throw createHttpError(401, 'User doesnt exist');
  }

  await Session.findOneAndDelete({
    _id: sessionId,
  });

  const accessToken = crypto.randomBytes(32).toString('hex');
  const refreshToken = crypto.randomBytes(32).toString('hex');

  return await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntill: new Date(Date.now() + 1000 * 60 * 15),
    refreshTokenValidUntill: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  });
};

export const updateUserProfile = async (payload, userId) => {
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
