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

export type Filters = {
  nationalities: FilterOption[];
  hobbies: FilterOption[];
};

export type UsersResponse = {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
  filters: Filters;
};
