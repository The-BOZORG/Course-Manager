import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const createPayload = (user) => {
  return { name: user.name, userId: user.userId ?? user.id, role: user.role };
};

const createAccessJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRY,
  });
};

const createRefreshJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRY,
  });
};

const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch {
    return null;
  }
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch {
    return null;
  }
};

const attachCookies = ({ res, user }) => {
  const payload = createPayload(user);

  const accessToken = createAccessJWT(payload);
  const refreshToken = createRefreshJWT(payload);

  res.cookie('accessToken', accessToken, {
    signed: true,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000,
  });

  res.cookie('refreshToken', refreshToken, {
    signed: true,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return { accessToken, refreshToken };
};

export {
  createPayload,
  createAccessJWT,
  createRefreshJWT,
  hashToken,
  verifyAccessToken,
  verifyRefreshToken,
  attachCookies,
};
