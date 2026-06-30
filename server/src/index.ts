import './database/db.js';
import cors from 'cors';
import express from 'express';
import { seed } from './database/seed.js';
import usersRouter from './routes/users.js';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  seed();
});
