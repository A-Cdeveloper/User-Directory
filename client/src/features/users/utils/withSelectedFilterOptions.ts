import type { FilterOption } from '@/types/user';

/** Keep URL-selected values visible even when the API omits them from facet options. */
export const withSelectedFilterOptions = (
  options: FilterOption[],
  selected: string[],
): FilterOption[] => {
  if (selected.length === 0) return options;

  const present = new Set(options.map((option) => option.value));
  const missing = selected
    .filter((value) => !present.has(value))
    .map((value) => ({ value, count: 0 }));

  return missing.length === 0 ? options : [...missing, ...options];
};
