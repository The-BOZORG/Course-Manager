import express from 'express';
const app = express();

//db
import database from './configs/dbConfig.js';

//router

//middlewares
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan('common'));
app.use(helmet());

//packages

//routes

//server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await database.authenticate();
    console.log('Mysql connect 🟢');

    await database.sync({ force: true });
    console.log('Models synced 🟢');

    app.listen(PORT, () => {
      console.log(`Server running in http://localost:${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed 🔴', error.message);
    process.exit(1);
  }
};

process.on('SIGINT', () => {
  console.log('Database disconnect 🔴');
  process.exit(0);
});

startServer();
