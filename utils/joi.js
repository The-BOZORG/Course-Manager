import joi from 'joi';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

const registerSchema = joi.object({
  name: joi.string().min(3).max(20).trim().required(),
  email: joi.string().min(6).max(30).email().lowercase().trim().required(),
  password: joi.string().min(6).max(20).pattern(passwordRegex).required(),
});

const loginSchema = joi.object({
  email: joi.string().min(6).max(30).email().lowercase().trim().required(),
  password: joi.string().min(6).max(30).required(),
});

export { registerSchema, loginSchema };
