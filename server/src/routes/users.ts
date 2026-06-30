import { Router } from 'express';
import { userQuerySchema } from '../schemas/userQuerySchema.js';
import { getUsers } from '../services/usersService.js';

const router = Router();

router.get('/', (req, res) => {
  const parsed = userQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    res.status(400).json({
      error: 'Invalid query parameters',
      details: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  res.json(getUsers(parsed.data));
});

export default router;
