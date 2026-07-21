import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';

type SelectedBadgesProps = {
  nationalities: string[];
  hobbies: string[];
  removeFilter: (paramKey: string, value: string) => void;
  clearAll: () => void;
};

const SelectedBadges = ({
  nationalities,
  hobbies,
  removeFilter,
  clearAll,
}: SelectedBadgesProps) => {
  const activeFilters = [
    ...nationalities.map((value) => ({ value, paramKey: 'nationalities' as const })),
    ...hobbies.map((value) => ({ value, paramKey: 'hobbies' as const })),
  ];

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {activeFilters.map((filter) => (
        <Badge
          key={`${filter.paramKey}-${filter.value}`}
          variant="default"
          className="text-[12px] rounded-full py-0.5 ps-2.5 pe-1.5 flex items-center justify-between gap-x-1.5"
        >
          <span className="truncate leading-normal">{filter.value}</span>
          <Button
            variant="ghost"
            size="iconSm"
            onClick={() => removeFilter(filter.paramKey, filter.value)}
            type="button"
            aria-label={`Remove ${filter.value} filter`}
          >
            <XIcon className="h-1.5 w-1.5" />
          </Button>
        </Badge>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="text-xs text-muted-foreground cursor-pointer"
        onClick={clearAll}
        type="button"
        aria-label="Clear all filters"
      >
        Clear all
      </Button>
    </div>
  );
};

export default SelectedBadges;
