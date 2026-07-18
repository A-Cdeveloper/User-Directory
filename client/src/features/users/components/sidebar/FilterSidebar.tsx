import FilterUsersGroup from './FilterUsersGroup';
import type { Filters } from '@/types/user';

const FilterSidebar = ({ filters }: { filters?: Filters }) => {
  return (
    <div className="flex h-auto flex-col pe-2">
      <FilterUsersGroup
        title="Nationalities"
        paramKey="nationalities"
        options={filters?.nationalities ?? []}
      />
      <FilterUsersGroup title="Hobbies" paramKey="hobbies" options={filters?.hobbies ?? []} />
    </div>
  );
};

export default FilterSidebar;
