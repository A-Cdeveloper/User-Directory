import type { SortBy, SortDir } from '@/types/users';

export const SORT_BY_OPTIONS: { value: SortBy; label: string }[] = [
  { value: 'first_name', label: 'First name' },
  { value: 'last_name', label: 'Last name' },
  { value: 'nationality', label: 'Nationality' },
  { value: 'age', label: 'Age' },
];

export const SORT_DIR_OPTIONS: { value: SortDir; label: string }[] = [
  { value: 'asc', label: 'Asc' },
  { value: 'desc', label: 'Desc' },
];

export const DEFAULT_SORT_BY: SortBy = SORT_BY_OPTIONS[0].value;
export const DEFAULT_SORT_DIR: SortDir = SORT_DIR_OPTIONS[0].value;
