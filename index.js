import express from 'express';
const app = express();

//db
import database from './configs/dbConfig.js';
import './models/index.js';

//router
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import courseRoute from './routes/course.js';

//middlewares
import errorHandler from './errors/errorHandler.js';
import notFound from './errors/notFound.js';
import { generalLimiter, authLimiter } from './utils/rateLimiter.js';

//packages
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import colors from 'colors';

app.use('/uploads', express.static('uploads'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan('dev'));
app.use(helmet());

//routes
app.use(generalLimiter);
app.use('/auth', authLimiter, authRoute);
app.use('/user', userRoute);
app.use('/course', courseRoute);

app.use(errorHandler);
app.use(notFound);

//server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await database.authenticate();
    console.log('Mysql connection successfully 🟢'.green);

    await database.sync({ force: true });
    console.log('Models synced successfully 🟢'.green);

    app.listen(PORT, () => {
      console.log(`Server running in http://localhost:${PORT}`.cyan.bold);
    });
  } catch (error) {
    console.error('Database connection failed 🔴', error.message.red);
    process.exit(1);
  }
};

const closeDB = async () => {
  console.log('Closing DB...'.red.bold);
  try {
    await database.close();
    console.log('DB closed 🔴'.red);
  } catch (err) {
    console.error('Error closing DB:', err.red);
  }
  process.exit(0);
};

process.on('SIGINT', closeDB);
process.on('SIGTERM', closeDB);

startServer();
