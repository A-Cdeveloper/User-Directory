import { useId } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const FilterItem = () => {
  const checkboxId = useId();
  const countId = useId();

  return (
    <li className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Checkbox
          id={checkboxId}
          aria-describedby={countId}
          className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
        />
        <Label htmlFor={checkboxId} className="text-sm text-muted-foreground">
          Nationality 1
        </Label>
      </div>
      <span id={countId} className="text-sm text-muted-foreground">
        100
      </span>
    </li>
  );
};

export default FilterItem;
