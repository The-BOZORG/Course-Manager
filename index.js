import express from 'express';
const app = express();

//router
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import courseRoute from './routes/course.js';
import adminRoute from './routes/admin.js';

//middlewares
import errorHandler from './errors/errorHandler.js';
import notFound from './errors/notFound.js';
import { generalLimiter, authLimiter } from './utils/rateLimiter.js';

//packages
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import logger from './configs/winstonConfig.js';
import swaggerUi from 'swagger-ui-express';
import specs from './configs/swagger.js';

app.use(morgan('dev'));
app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }),
);
app.use('/uploads', express.static('uploads'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(helmet());

//routes
app.use(generalLimiter);
app.use('/auth', authLimiter, authRoute);
app.use('/user', userRoute);
app.use('/course', courseRoute);
app.use('/admin', adminRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get('/', (req, res) => res.redirect('/api-docs'));

app.use(errorHandler);
app.use(notFound);

export default app;
