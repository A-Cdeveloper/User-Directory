import './database/db.js';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { createApiRateLimiter } from './lib/createApiRateLimiter.js';
import { createCorsOptions } from './lib/createCorsOptions.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import usersRouter from './routes/users.js';

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors(createCorsOptions()));
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api', createApiRateLimiter());
  app.use('/api/users', usersRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
