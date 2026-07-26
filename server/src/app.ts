import './database/db.js';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import usersRouter from './routes/users.js';

const parseOrigins = (value: string | undefined) =>
  (value ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

export function createApp() {
  const app = express();
  const allowedOrigins = parseOrigins(process.env.CORS_ORIGINS);

  app.use(helmet());
  app.use(
    cors({
      origin(origin, callback) {
        // No Origin header: curl, server-to-server, same-origin requests
        callback(null, !origin || allowedOrigins.includes(origin));
      },
    }),
  );
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/users', usersRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
