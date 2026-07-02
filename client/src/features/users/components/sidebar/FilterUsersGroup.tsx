import { useId } from 'react';
import FilterItem from './FilterItem';

type FilterGroupProps = {
  title: string;
};

const FilterGroup = ({ title }: FilterGroupProps) => {
  const headingId = useId();

  return (
    <div role="group" aria-labelledby={headingId} className="flex h-[40%] min-h-0 flex-col">
      <h2 id={headingId} className="mb-4 shrink-0 font-bold text-muted-foreground">
        {title}
      </h2>

      <ul className="custom-scrollbar flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pe-2">
        <FilterItem />
        <FilterItem />
        <FilterItem />
      </ul>
    </div>
  );
};

export default FilterGroup;
