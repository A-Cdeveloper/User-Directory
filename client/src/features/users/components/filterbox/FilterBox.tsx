import {
  DEFAULT_SORT_BY,
  DEFAULT_SORT_DIR,
  SORT_BY_OPTIONS,
  SORT_DIR_OPTIONS,
} from '@/features/users/constants';
import { useUsersParams } from '@/features/users/hooks/useUsersParams';
import type { SortBy, SortDir } from '@/types/users';
import SearchInput from './SearchInput';
import SelectedBadges from './SelectedBadges';
import SortingField from './SortingField';

const FilterBox = ({ totalCount }: { totalCount: number }) => {
  const { getParam, setParam, getListParam, setListParamValue, clearAllFilters } = useUsersParams();
  const sortBy = (getParam('sortBy') || DEFAULT_SORT_BY) as SortBy;
  const sortDir = (getParam('sortDir') || DEFAULT_SORT_DIR) as SortDir;
  const search = getParam('search');

  const nationalities = getListParam('nationalities');
  const hobbies = getListParam('hobbies');

  const removeFilter = (paramKey: string, value: string) => {
    setListParamValue(paramKey, value, false);
  };

  return (
    <div className="flex w-full shrink-0 flex-col gap-3 bg-accent p-4">
      <SelectedBadges
        nationalities={nationalities}
        hobbies={hobbies}
        removeFilter={removeFilter}
        clearAll={() => clearAllFilters(['nationalities', 'hobbies'])}
      />
      <div className="flex items-center justify-between gap-4">
        <SearchInput
          placeholder="Search by last / first name"
          value={search}
          onChange={(value) => setParam('search', value, { replace: true })}
        />
      </div>
      <div className="flex items-center gap-2">
        <SortingField
          value={sortBy}
          placeholder="Sort by"
          className="w-[160px]"
          options={SORT_BY_OPTIONS}
          onChange={(value) => setParam('sortBy', value)}
        />

        <SortingField
          value={sortDir}
          placeholder="Direction"
          className="w-[120px]"
          options={SORT_DIR_OPTIONS}
          onChange={(value) => setParam('sortDir', value)}
        />
      </div>
      <span className="shrink-0 text-[13px] text-muted-foreground">
        {totalCount} {totalCount > 1 ? 'users found' : 'user found'}
      </span>
    </div>
  );
};

export default FilterBox;
