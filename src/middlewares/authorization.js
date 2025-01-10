import createHttpError from 'http-errors';
import { Session } from '../db/models/Session.js';
import { User } from '../db/models/User.js';

export const authorization = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  console.log('bearerToken: ', bearerToken);

  if (!bearerToken) {
    next(createHttpError(400, 'Token not exist or invalid'));
  }

  const [bearer, token] = bearerToken.split(' ');

  if (!bearer || !token || bearer !== 'Bearer') {
    return next(createHttpError(401, 'Bearer token not exist or invalid'));
  }

  const session = await Session.findOne({
    accessToken: token,
  });

  if (!session) {
    return next(createHttpError(404, 'Session not found'));
  }

  if (Date.now() > session.accessTokenValidUntill) {
    return next(createHttpError(401, 'Token is expired'));
  }

  const user = await User.findOne({
    _id: session.userId,
  });

  if (!user) {
    return next(createHttpError(404, 'User not found or doesnt exist'));
  }

  req.user = user;
  next();
};
