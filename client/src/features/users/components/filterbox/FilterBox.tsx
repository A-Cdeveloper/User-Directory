import { SORT_BY_OPTIONS, SORT_DIR_OPTIONS } from '@/features/users/constants';
import SearchInput from './SearchInput';
import SelectedBadges from './SelectedBadges';
import SortingField from './SortingField';
import { useUserFilters } from '@/features/users/hooks/useUserFilters';

const FilterBox = ({ totalCount }: { totalCount: number }) => {
  const {
    nationalities,
    hobbies,
    sortBy,
    sortDir,
    search,
    setSearch,
    setSortBy,
    setSortDir,
    removeFilter,
    clearAllFilters,
  } = useUserFilters();

  return (
    <div className="flex w-full shrink-0 flex-col gap-3 bg-accent p-4">
      <SelectedBadges
        nationalities={nationalities}
        hobbies={hobbies}
        removeFilter={removeFilter}
        clearAll={clearAllFilters}
      />
      <div className="flex items-center justify-between gap-4">
        <SearchInput
          placeholder="Search by last / first name"
          value={search}
          onChange={setSearch}
        />
      </div>
      <div className="flex items-center gap-2">
        <SortingField
          value={sortBy}
          placeholder="Sort by"
          className="w-[160px]"
          options={SORT_BY_OPTIONS}
          onChange={setSortBy}
        />

        <SortingField
          value={sortDir}
          placeholder="Direction"
          className="w-[120px]"
          options={SORT_DIR_OPTIONS}
          onChange={setSortDir}
        />
      </div>
      <span className="shrink-0 text-[13px] text-muted-foreground">
        {totalCount} {totalCount > 1 ? 'users found' : 'user found'}
      </span>
    </div>
  );
};

export default FilterBox;
