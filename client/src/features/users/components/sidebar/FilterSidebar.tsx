import FilterUsersGroup from './FilterUsersGroup';

const FilterSidebar = () => {
  return (
    <div className="flex flex-col h-full pe-2">
      <FilterUsersGroup title="Nationalities" />
      <FilterUsersGroup title="Hobbies" />
    </div>
  );
};

export default FilterSidebar;
