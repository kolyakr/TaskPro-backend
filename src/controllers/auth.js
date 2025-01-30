import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
} from '../services/auth.js';
import { saveToCloudinary } from '../utils/saveToCloudinary.js';

const clearCookies = (res) => {
  res.clearCookie('sessionId', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });
  res.clearCookie('sessionToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });
};

const setCookies = (res, session) => {
  res.cookie('sessionId', session._id, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });
  res.cookie('sessionToken', session.refreshToken, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    httpOnly: true,
    secure: true,
    sameSite: 'None',
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
  const { session, user } = await loginUser(payload);

  clearCookies(res);
  setCookies(res, session);

  res.json({
    status: 200,
    messsage: 'User was successfully logined',
    data: {
      user: {
        name: user.name,
        email: user.email,
        theme: user.theme,
        avatar: user?.avatar,
      },
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
