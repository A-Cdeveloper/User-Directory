import { createApp } from './app.js';
import { seed } from './database/seed.js';

const PORT = Number(process.env.PORT) || 3001;
const app = createApp();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  try {
    seed();
  } catch (err) {
    console.error('Seed failed:', err);
  }
});
