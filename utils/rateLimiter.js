import { rateLimit } from 'express-rate-limit';

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: {
    status: 429,
    message: 'Too many requests, try again later',
  },
});

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: {
    status: 429,
    message: 'Too many login attempts, try again later',
  },
});

export { generalLimiter, authLimiter };
