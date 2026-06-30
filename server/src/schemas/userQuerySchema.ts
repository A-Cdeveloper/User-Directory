import { z } from 'zod';
import { SORT_COLUMNS } from '../types/user.js';

const commaSeparatedList = z
  .union([z.string(), z.array(z.string())])
  .optional()
  .transform((value) => {
    if (value === undefined) return [];
    const raw = Array.isArray(value) ? value.join(',') : value;
    return raw
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean);
  });

const queryString = z
  .union([z.string(), z.array(z.string())])
  .optional()
  .transform((value) => {
    if (value === undefined) return '';
    return Array.isArray(value) ? (value[0] ?? '') : value;
  });

export const userQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: queryString,
  nationalities: commaSeparatedList,
  hobbies: commaSeparatedList,
  sortBy: z.enum(SORT_COLUMNS).catch('first_name'),
  sortDir: z.enum(['asc', 'desc']).catch('asc'),
});

export type UserQueryParams = z.infer<typeof userQuerySchema>;
