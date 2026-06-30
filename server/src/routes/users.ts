import { Router } from 'express';
import { parseUserQuery } from '../lib/queryParams.js';
import { getUsers } from '../services/usersService.js';

const router = Router();

router.get('/', (req, res) => {
  const params = parseUserQuery(req.query);
  res.json(getUsers(params));
});

export default router;
