import { Button } from '@/components/ui/button';
import { withSelectedFilterOptions } from '@/features/users/utils/withSelectedFilterOptions';
import { useUserFilters } from '@/features/users/hooks/useUserFilters';
import type { FilterOption } from '@/types/user';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import FilterItem from './FilterItem';

type FilterGroupProps = {
  title: string;
  paramKey: string;
  options: FilterOption[];
};

const FilterUserGroup = ({ title, paramKey, options }: FilterGroupProps) => {
  const headingId = `${paramKey}-heading`;
  const listId = `${paramKey}-list`;
  const [isOpen, setIsOpen] = useState(true);
  const { nationalities, hobbies, toggleFilter, clearGroup } = useUserFilters();

  const selected =
    paramKey === 'nationalities' ? nationalities : paramKey === 'hobbies' ? hobbies : [];
  const visibleOptions = withSelectedFilterOptions(options, selected);

  return (
    <div role="group" aria-labelledby={headingId} className="flex shrink-0 flex-col border-b">
      <Button
        variant="ghost"
        id={headingId}
        className="mb-0 flex shrink-0 items-center justify-between gap-2 font-bold text-muted-foreground py-2 rounded-none
        hover:rounded-none ps-2"
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => setIsOpen((open) => !open)}
        aria-label={`Toggle ${title} filter`}
      >
        <span>
          {title}{' '}
          {selected?.length > 0 && (
            <span className="text-sm text-muted-foreground">({selected?.length})</span>
          )}
        </span>

        {isOpen ? (
          <ChevronDown className="size-4 shrink-0" aria-hidden />
        ) : (
          <ChevronRight className="size-4 shrink-0" aria-hidden />
        )}
      </Button>

      {isOpen && (
        <>
          <ul
            id={listId}
            className="custom-scrollbar flex max-h-60 flex-col gap-2 overflow-y-auto border-t border-border px-2 py-4 md:max-h-[45vh]"
          >
            {visibleOptions.map((option) => (
              <FilterItem
                key={option.value}
                paramKey={paramKey}
                value={option.value}
                checked={selected.includes(option.value)}
                count={option.count}
                onCheckedChange={(checked) => toggleFilter(paramKey, option.value, checked)}
              />
            ))}
          </ul>
          {selected?.length > 0 && (
            <div className="px-2 justify-end flex">
              <span
                className="ps-6 text-[13px] my-4 cursor-pointer text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  clearGroup(paramKey);
                }}
              >
                reset filter
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FilterUserGroup;
