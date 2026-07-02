import FilterUsersGroup from './FilterUsersGroup';

const FilterSidebar = () => {
  return (
    <div className="flex flex-col h-full gap-8 pe-4">
      <FilterUsersGroup title="Nationalities" />
      <FilterUsersGroup title="Hobbies" />
    </div>
  );
};

export default FilterSidebar;
