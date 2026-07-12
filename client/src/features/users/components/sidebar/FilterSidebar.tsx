import FilterUsersGroup from './FilterUsersGroup';
import type { Filters } from '@/types/user';

const FilterSidebar = ({ filters }: { filters?: Filters }) => {
  return (
    <div className="flex h-full flex-col pe-2">
      <FilterUsersGroup title="Nationalities" options={filters?.nationalities ?? []} />
      <FilterUsersGroup title="Hobbies" options={filters?.hobbies ?? []} />
    </div>
  );
};

export default FilterSidebar;
