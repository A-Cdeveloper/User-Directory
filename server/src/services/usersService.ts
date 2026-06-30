import db from '../database/db.js';
import { buildWhereClause } from '../lib/buildWhereClause.js';
import type { User, UserQueryParams, UsersResponse } from '../types/user.js';

type UserRow = {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  age: number;
  nationality: string;
  hobbies: string;
};

export function getUsers(params: UserQueryParams): UsersResponse {
  const offset = (params.page - 1) * params.limit;
  const sortOrder = params.sortDir === 'desc' ? 'DESC' : 'ASC';

  const { whereSql, whereNationalityFilterSql, queryParams, nationalityFilterParams } =
    buildWhereClause(params);

  const users = db
    .prepare(
      `
    SELECT
      users.id,
      users.avatar,
      users.first_name,
      users.last_name,
      users.age,
      users.nationality,
      COALESCE(GROUP_CONCAT(DISTINCT hobbies.name), '') as hobbies
    FROM users
    LEFT JOIN user_hobbies ON user_hobbies.user_id = users.id
    LEFT JOIN hobbies ON hobbies.id = user_hobbies.hobby_id
    ${whereSql}
    GROUP BY users.id
    ORDER BY users.${params.sortBy} ${sortOrder}, users.id ASC
    LIMIT ? OFFSET ?
  `,
    )
    .all(...queryParams, params.limit, offset) as UserRow[];

  const usersWithHobbies: User[] = users.map((user) => ({
    ...user,
    hobbies: user.hobbies ? user.hobbies.split(',') : [],
  }));

  const totalResult = db
    .prepare(
      `
    SELECT COUNT(*) as total
    FROM users
    ${whereSql}
  `,
    )
    .get(...queryParams) as { total: number };

  const total = totalResult.total;
  const hasMore = offset + params.limit < total;

  const nationalityFilters = db
    .prepare(
      `
    SELECT
      nationality as value,
      COUNT(*) as count
    FROM users
    ${whereNationalityFilterSql}
    GROUP BY nationality
    ORDER BY count DESC, nationality ASC
    LIMIT 20
  `,
    )
    .all(...nationalityFilterParams);

  const hobbyFilters = db
    .prepare(
      `
    SELECT
      h.name as value,
      COUNT(DISTINCT users.id) as count
    FROM users
    JOIN user_hobbies uh ON uh.user_id = users.id
    JOIN hobbies h ON h.id = uh.hobby_id
    ${whereSql}
    GROUP BY h.name
    ORDER BY count DESC, h.name ASC
    LIMIT 20
  `,
    )
    .all(...queryParams);

  return {
    users: usersWithHobbies,
    pagination: {
      page: params.page,
      limit: params.limit,
      total,
      hasMore,
    },
    filters: {
      nationalities: nationalityFilters as UsersResponse['filters']['nationalities'],
      hobbies: hobbyFilters as UsersResponse['filters']['hobbies'],
    },
  };
}
