import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'node:path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.development') });

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
