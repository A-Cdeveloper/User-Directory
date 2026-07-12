import { useId, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import FilterItem from './FilterItem';
import type { FilterOption } from '@/types/user';

type FilterGroupProps = {
  title: string;
  options: FilterOption[];
};

const FilterGroup = ({ title, options }: FilterGroupProps) => {
  const headingId = useId();
  const listId = useId();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      role="group"
      aria-labelledby={headingId}
      className={`flex flex-col border-b ${isOpen ? 'h-0 min-h-[40%]' : 'shrink-0'}`}
    >
      <button
        type="button"
        id={headingId}
        className="mb-0 flex shrink-0 items-center justify-between gap-2 font-bold text-muted-foreground py-2"
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>
          {title} ({options.length})
        </span>
        {isOpen ? (
          <ChevronDown className="size-4 shrink-0" aria-hidden />
        ) : (
          <ChevronRight className="size-4 shrink-0" aria-hidden />
        )}
      </button>

      {isOpen && (
        <ul
          id={listId}
          className="custom-scrollbar flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pe-2 py-4
          border-t border-border"
        >
          {options.map((option) => (
            <FilterItem key={option.value} value={option.value} count={option.count} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterGroup;
