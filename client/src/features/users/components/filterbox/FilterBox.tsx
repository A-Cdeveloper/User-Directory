import {
  DEFAULT_SORT_BY,
  DEFAULT_SORT_DIR,
  SORT_BY_OPTIONS,
  SORT_DIR_OPTIONS,
} from '@/features/users/constants';
import { useUsersParams } from '@/features/users/hooks/useUsersParams';
import type { SortBy, SortDir } from '@/types/users';
import SortingField from './SortingField';

const FilterBox = ({ totalCount }: { totalCount: number }) => {
  const { getParam, setParam } = useUsersParams();
  const sortBy = (getParam('sortBy') || DEFAULT_SORT_BY) as SortBy;
  const sortDir = (getParam('sortDir') || DEFAULT_SORT_DIR) as SortDir;

  return (
    <div className="flex h-1/6 w-full flex-col justify-between bg-accent p-4">
      {/* <div className="flex items-center justify-between gap-4">
        <Input
          type="search"
          placeholder="Search by last / first name"
          className="w-full border bg-white border-gray-300 shadow-none rounded-none placeholder:text-gray-500"
        />
      </div> */}
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
