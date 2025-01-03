import createHttpError from 'http-errors';
import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
  updateUserProfile,
} from '../services/auth.js';
import { saveToCloudinary } from '../utils/saveToCloudinary.js';

const clearCookies = (res) => {
  res.clearCookie('sessionId');
  res.clearCookie('sessionToken');
};

const setCookies = (res, session) => {
  res.cookie('sessionId', session._id, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    httpOnly: true,
  });
  res.cookie('sessionToken', session.refreshToken, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    httpOnly: true,
  });
};

export const registerUserController = async (req, res) => {
  const avatar = await saveToCloudinary(req);

  let payload = req.body;

  if (avatar) {
    payload = {
      ...payload,
      avatar: avatar,
    };
  }

  const user = await registerUser(payload);

  res.json({
    status: 200,
    message: 'User was successfully created',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const payload = req.body;
  const session = await loginUser(payload);

  clearCookies(res);
  setCookies(res, session);

  res.json({
    status: 200,
    messsage: 'User was successfully logined',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  const sessionToken = req.cookies.sessionToken;
  const sessionId = req.cookies.sessionId;

  await logoutUser(sessionToken, sessionId);

  clearCookies(res);

  res.json({
    status: 200,
    message: 'Successfull logout',
    data: {},
  });
};

export const refreshSessionController = async (req, res) => {
  const sessionToken = req.cookies.sessionToken;
  const sessionId = req.cookies.sessionId;

  const session = await refreshSession(sessionToken, sessionId);

  clearCookies(res);
  setCookies(res, session);

  res.json({
    status: 200,
    message: 'Session was successfully refreshed',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const updateUserProfileController = async (req, res) => {
  const avatar = await saveToCloudinary(req);
  let payload = req.body || {};

  if (avatar) {
    payload = {
      ...payload,
      avatar: avatar,
    };
  }

  const { user } = req;

  const updatedUser = await updateUserProfile(payload, user._id);
  const { password, ...updatedUserData } = updatedUser._doc;

  res.json({
    status: 200,
    message: 'User profile successfully updated',
    data: updatedUserData,
  });
};
