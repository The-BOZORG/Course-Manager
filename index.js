import express from 'express';
const app = express();

//db
import database from './configs/dbConfig.js';

//router

//middlewares
import errorHandler from './errors/errorHandler.js';
import notFound from './errors/notFound.js';
import limiter from './utils/rateLimiter.js';

//packages
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import colors from 'colors';

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan('common'));
app.use(helmet());

//packages

//routes
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
      console.log(`Server running in http://locahost:${PORT}`.cyan.bold);
    });
  } catch (error) {
    console.error('Database connection failed 🔴', error.message);
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  console.log('Received SIGINT. Closing DB...'.red.bold);
  try {
    await database.close();
    console.log('DB closed 🔴');
  } catch (err) {
    console.error('Error closing DB:', err);
  }
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM. Closing DB...'.red.bold);
  try {
    await database.close();
    console.log('DB closed 🔴');
  } catch (err) {
    console.error('Error closing DB:', err);
  }
  process.exit(0);
});

startServer();
