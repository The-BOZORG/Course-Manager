import { loginSchema, registerSchema } from '../utils/joi.js';
import catchAsync from '../utils/catchAsync.js';
import CustomError from '../errors/customError.js';
import {
  registerService,
  loginService,
  logoutService,
} from '../services/auth.js';

// REGISTER
const register = catchAsync(async (req, res) => {
  const { error } = registerSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    throw new CustomError(
      error.details.map((item) => item.message).join(', '),
      400,
    );
  }

  const { user, accessToken } = await registerService({
    body: req.body,
    ip: req.ip,
    res,
    userAgent: req.get('user-agent'),
  });

  res.status(201).json({
    success: true,
    message: 'user registered successfully',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,
  });
});

// LOGIN
const login = catchAsync(async (req, res) => {
  const { error } = loginSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    throw new CustomError(
      error.details.map((item) => item.message).join(', '),
      400,
    );
  }

  const { user, accessToken } = await loginService({
    body: req.body,
    ip: req.ip,
    res,
    userAgent: req.get('user-agent'),
  });

  res.status(200).json({
    success: true,
    message: 'login successful',
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
    },
    accessToken,
  });
});

// LOGOUT
const logout = catchAsync(async (req, res) => {
  const refreshToken = req.signedCookies.refreshToken;

  await logoutService({
    refreshToken,
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.status(200).json({
    success: true,
    message: 'logout successful',
  });
});

export { register, login, logout };
