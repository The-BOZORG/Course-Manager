import CustomError from '../errors/customError.js';
import Token from '../models/token.js';
import {
  verifyAccessToken,
  verifyRefreshToken,
  attachCookies,
  hashToken,
} from '../utils/jwt.js';

const authenticateUser = async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies;

  try {
    if (accessToken) {
      const auth = verifyAccessToken(accessToken);
      if (auth) {
        req.user = auth;
        return next();
      }
    }

    if (!refreshToken) {
      throw new CustomError('Authentication Invalid', 401);
    }

    const auth = verifyRefreshToken(refreshToken);
    if (!auth) {
      throw new CustomError('Authentication Invalid', 401);
    }

    const hashedToken = hashToken(refreshToken);
    const existToken = await Token.findOne({
      where: { userId: auth.userId, refreshToken: hashedToken },
    });

    if (!existToken) {
      throw new CustomError('Authentication Invalid', 401);
    }

    const tokens = attachCookies({
      res,
      user: auth,
    });

    await existToken.update({
      refreshToken: hashToken(tokens.refreshToken),
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    req.user = auth;
    next();
  } catch (error) {
    next(new CustomError('Authentication Invalid', 401));
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError('Unauthorized to access this route', 403);
    }
    next();
  };
};

export { authenticateUser, authorizePermissions };
