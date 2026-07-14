import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import FilterItem from './FilterItem';
import type { FilterOption } from '@/types/user';
import { Button } from '@/components/ui/button';
import { useUsersParams } from '@/features/users/hooks/useUsersParams';

type FilterGroupProps = {
  title: string;
  paramKey: string;
  options: FilterOption[];
};

const FilterUserGroup = ({ title, paramKey, options }: FilterGroupProps) => {
  const headingId = `${paramKey}-heading`;
  const listId = `${paramKey}-list`;
  const [isOpen, setIsOpen] = useState(true);
  const { getListParam, setListParamValue } = useUsersParams();
  const selected = getListParam(paramKey);

  return (
    <div
      role="group"
      aria-labelledby={headingId}
      className={`flex flex-col border-b ${isOpen ? 'h-0 min-h-[40%]' : 'shrink-0'}`}
    >
      <Button
        variant="ghost"
        id={headingId}
        className="mb-0 flex shrink-0 items-center justify-between gap-2 font-bold text-muted-foreground py-2"
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => setIsOpen((open) => !open)}
        aria-label={`Toggle ${title} filter`}
      >
        <span>
          {title} ({options.length})
        </span>
        {isOpen ? (
          <ChevronDown className="size-4 shrink-0" aria-hidden />
        ) : (
          <ChevronRight className="size-4 shrink-0" aria-hidden />
        )}
      </Button>

      {isOpen && (
        <ul
          id={listId}
          className="custom-scrollbar flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pe-2 py-4
          border-t border-border"
        >
          {options.map((option) => (
            <FilterItem
              key={option.value}
              paramKey={paramKey}
              value={option.value}
              checked={selected.includes(option.value)}
              count={option.count}
              onCheckedChange={(checked) => setListParamValue(paramKey, option.value, checked)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterUserGroup;
