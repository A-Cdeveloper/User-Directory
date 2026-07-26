import { config as loadEnv } from 'dotenv';
import path from 'node:path';

const nodeEnv = process.env.NODE_ENV ?? 'development';
const root = process.cwd();

// Same idea as Vite: base file, then mode file.
// .env.development fills gaps (e.g. NODE_ENV=test with no .env.test).
loadEnv({ path: path.resolve(root, '.env') });
loadEnv({ path: path.resolve(root, `.env.${nodeEnv}`) });
loadEnv({ path: path.resolve(root, '.env.development') });
