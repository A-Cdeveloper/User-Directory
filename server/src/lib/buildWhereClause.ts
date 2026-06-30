import type { UserQueryParams } from '../types/user.js';

export type WhereClause = {
  whereSql: string;
  whereNationalityFilterSql: string;
  queryParams: (string | number)[];
  nationalityFilterParams: (string | number)[];
};

export function buildWhereClause(
  params: Pick<UserQueryParams, 'search' | 'nationalities' | 'hobbies'>,
): WhereClause {
  const whereConditions: string[] = [];
  const queryParams: (string | number)[] = [];
  const nationalityFilterConditions: string[] = [];
  const nationalityFilterParams: (string | number)[] = [];

  if (params.search) {
    const clause = `(
      first_name LIKE ? OR
      last_name LIKE ? OR
      first_name || ' ' || last_name LIKE ?)`;
    whereConditions.push(clause);
    nationalityFilterConditions.push(clause);
    const pattern = `%${params.search}%`;
    queryParams.push(pattern, pattern, pattern);
    nationalityFilterParams.push(pattern, pattern, pattern);
  }

  if (params.nationalities.length > 0) {
    const placeholders = params.nationalities.map(() => '?').join(',');
    whereConditions.push(`nationality IN (${placeholders})`);
    queryParams.push(...params.nationalities);
  }

  if (params.hobbies.length > 0) {
    const placeholders = params.hobbies.map(() => '?').join(',');
    const clause = `
      users.id IN (
        SELECT uh.user_id FROM user_hobbies uh JOIN hobbies h ON h.id = uh.hobby_id
        WHERE h.name IN (${placeholders})
        GROUP BY uh.user_id
        HAVING COUNT(DISTINCT h.name) = ?
      )
    `;
    whereConditions.push(clause);
    nationalityFilterConditions.push(clause);
    queryParams.push(...params.hobbies, params.hobbies.length);
    nationalityFilterParams.push(...params.hobbies, params.hobbies.length);
  }

  return {
    whereSql: whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '',
    whereNationalityFilterSql:
      nationalityFilterConditions.length > 0
        ? `WHERE ${nationalityFilterConditions.join(' AND ')}`
        : '',
    queryParams,
    nationalityFilterParams,
  };
}
