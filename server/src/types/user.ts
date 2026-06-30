export const SORT_COLUMNS = ['first_name', 'last_name', 'nationality', 'age'] as const;

export type SortColumn = (typeof SORT_COLUMNS)[number];

export type SortDirection = 'asc' | 'desc';

export type User = {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  age: number;
  nationality: string;
  hobbies: string[];
};

export type FilterOption = {
  value: string;
  count: number;
};

export type UserQueryParams = {
  page: number;
  limit: number;
  search: string;
  nationalities: string[];
  hobbies: string[];
  sortBy: SortColumn;
  sortDir: SortDirection;
};

export type UsersResponse = {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
  filters: {
    nationalities: FilterOption[];
    hobbies: FilterOption[];
  };
};
