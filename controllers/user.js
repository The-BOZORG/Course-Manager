import { loginSchema, registerSchema } from '../utils/joi.js';
import catchAsync from '../utils/catchAsync.js';
import CustomError from '../errors/customError.js';
import {
  registerService,
  loginService,
  logoutService,
} from '../services/user.js';

// REGISTER
const register = catchAsync(async (req, res) => {
  const { error } = registerSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    throw new CustomError('input errors', 400);
  }

  const { user, accessToken } = await registerService({
    body: req.body,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    res,
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
  const { error } = loginSchema.validate(req.body);

  if (error) {
    throw new CustomError('input errors', 400);
  }

  const { user, accessToken } = await loginService({
    body: req.body,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    res,
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
  const refreshToken = req.cookies.refreshToken;

  await logoutService({
    refreshToken,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
  });

  res.clearCookie('refreshToken');
  res.clearCookie('accessToken');

  res.status(200).json({
    success: true,
    message: 'logout successful',
  });
});

export { register, login, logout };
