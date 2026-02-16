import User from '../models/user.js';
import Token from '../models/token.js';
import CustomError from '../errors/customError.js';
import { attachCookies, hashToken } from '../utils/jwt.js';

// REGISTER
const registerService = async ({ body, ip, userAgent, res }) => {
  const { name, email, password } = body;

  const emailExist = await User.findOne({ where: { email } });
  if (emailExist) {
    throw new CustomError('Email already exists', 400);
  }

  const isFirstAccount = (await User.count()) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  const user = await User.create({ name, email, password, role });

  const { accessToken, refreshToken } = attachCookies({ res, user });

  const hashedToken = hashToken(refreshToken);

  await Token.create({
    refreshToken: hashedToken,
    ip,
    userAgent: userAgent,
    userId: user.id,
  });

  return {
    user,
    accessToken,
  };
};

// LOGIN
const loginService = async ({ body, ip, userAgent, res }) => {
  const { email, password } = body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new CustomError('Invalid email or password', 401);
  }

  const passwordCorrect = await user.comparePassword(password);

  if (!passwordCorrect) {
    throw new CustomError('Invalid email or password', 401);
  }

  const { accessToken, refreshToken } = attachCookies({ res, user });

  const hashedToken = hashToken(refreshToken);

  await Token.destroy({
    where: {
      userId: user.id,
      ip,
      userAgent: userAgent,
    },
  });

  await Token.create({
    refreshToken: hashedToken,
    ip,
    userAgent: userAgent,
    userId: user.id,
  });

  return {
    user,
    accessToken,
  };
};

// LOGOUT
const logoutService = async ({ refreshToken, ip, userAgent }) => {
  if (refreshToken) {
    const hashedToken = hashToken(refreshToken);
    await Token.destroy({
      where: { refreshToken: hashedToken, ip, userAgent },
    });
  }
};

export { registerService, loginService, logoutService };

