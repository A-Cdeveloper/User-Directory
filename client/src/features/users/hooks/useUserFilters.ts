import { DEFAULT_SORT_BY, DEFAULT_SORT_DIR } from '@/features/users/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { useUrlParams } from '@/hooks/useUrlParams';
import type { SortBy, SortDir } from '@/types/users';

export const useUserFilters = () => {
  const { getListParam, getParam, setListParamValue, clearListParam, setParam, clearParams } =
    useUrlParams();
  const nationalities = getListParam('nationalities');
  const hobbies = getListParam('hobbies');
  const sortBy = (getParam('sortBy') || DEFAULT_SORT_BY) as SortBy;
  const sortDir = (getParam('sortDir') || DEFAULT_SORT_DIR) as SortDir;
  const search = getParam('search');
  const debouncedSearch = useDebounce(search, 500);

  const setSearch = (value: string) => {
    setParam('search', value, { replace: true });
  };

  const setSortBy = (value: SortBy) => {
    setParam('sortBy', value, { replace: true });
  };

  const setSortDir = (value: SortDir) => {
    setParam('sortDir', value, { replace: true });
  };

  const clearAllFilters = () => {
    clearParams(['nationalities', 'hobbies']);
  };

  const removeFilter = (paramKey: string, value: string) => {
    setListParamValue(paramKey, value, false);
  };

  const toggleFilter = (paramKey: string, value: string, enabled: boolean) => {
    setListParamValue(paramKey, value, enabled);
  };

  const clearGroup = (paramKey: string) => {
    clearListParam(paramKey);
  };

  return {
    nationalities,
    hobbies,
    sortBy,
    sortDir,
    search,
    debouncedSearch,
    clearAllFilters,
    removeFilter,
    setSearch,
    setSortBy,
    setSortDir,
    toggleFilter,
    clearGroup,
  };
};
