export type SortBy = 'first_name' | 'last_name' | 'nationality' | 'age';
export type SortDir = 'asc' | 'desc';

export type GetUsersParams = {
  page?: number;
  limit?: number;
  search?: string;
  nationalities?: string[];
  hobbies?: string[];
  sortBy?: SortBy;
  sortDir?: SortDir;
};
