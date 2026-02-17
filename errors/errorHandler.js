import CustomError from './customError.js';

const errorHandler = (err, req, res, next) => {
  let error = err;

  //sequelize validation
  if (err.name === 'SequelizeValidationError') {
    error = new CustomError(err.errors.map((e) => e.message).join(', '), 400);
  }

  //duplicate entry
  if (err.name === 'SequelizeUniqueConstraintError') {
    error = new CustomError(err.errors.map((e) => e.message).join(', '), 400);
  }

  //foreign key constraint
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    error = new CustomError('Invalid reference: related record not found', 400);
  }

  //database errors(cast)
  if (err.name === 'SequelizeDatabaseError') {
    error = new CustomError(`Database error: ${err.message}`, 500);
  }

  //connection error
  if (err.original && err.original.code === 'ECONNREFUSED') {
    error = new CustomError('Database connection was refused', 500);
  }

  //JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new CustomError('Invalid token. Authentication failed', 401);
  }
  if (err.name === 'TokenExpiredError') {
    error = new CustomError('Token has expired. Please log in again', 401);
  }

  //multer errors
  if (err.name === 'MulterError') {
    error = new CustomError(err.message, 400);
  }

  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({ msg: error.message });
};

export default errorHandler;
