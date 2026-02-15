import CustomError from '../errors/customError';
import Token from '../models/token.js';
import {
  verifyAccessToken,
  verifyRefreshToken,
  attachCookies,
} from '../utils/jwt.js';

const authenticateUser = async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies;

  try {
    if (accessToken) {
      const auth = verifyAccessToken(accessToken);
      req.user = auth.user;
      return next();
    }

    if (!refreshToken) throw new CustomError('Authentication Invalid', 401);

    const auth = verifyRefreshToken(refreshToken);
    const existToken = await Token.findOne({
      where: { userId: auth.user.userId, refreshToken: auth.refreshToken },
    });

    if (!existToken) {
      throw new CustomError('authentication Invalid', 401);
    }

    const tokens = attachCookies({
      res,
      user: auth.user,
    });

    await existToken.update({
      refreshToken: tokens.refreshToken,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    req.user = auth.user;
    next();
  } catch (error) {
    throw new CustomError('authentication Invalid', 401);
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route',
      );
    }
    next();
  };
};

export { authenticateUser, authorizePermissions };
