import type { ParsedQs } from 'qs';
import { SORT_COLUMNS, type SortColumn, type UserQueryParams } from '../types/user.js';

export function queryString(value: unknown): string {
  if (typeof value === 'string') return value;
  if (Array.isArray(value) && typeof value[0] === 'string') return value[0];
  return '';
}

export function parseList(value: unknown): string[] {
  const raw = queryString(value);
  return raw ? raw.split(',').filter(Boolean) : [];
}

export function parseUserQuery(query: ParsedQs): UserQueryParams {
  const sortByParam = queryString(query.sortBy);
  const sortBy: SortColumn = SORT_COLUMNS.includes(sortByParam as SortColumn)
    ? (sortByParam as SortColumn)
    : 'first_name';

  return {
    page: Number(query.page) || 1,
    limit: Number(query.limit) || 20,
    search: queryString(query.search),
    nationalities: parseList(query.nationalities),
    hobbies: parseList(query.hobbies),
    sortBy,
    sortDir: queryString(query.sortDir) === 'desc' ? 'desc' : 'asc',
  };
}
