import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type FilterItemProps = {
  paramKey: string;
  value: string;
  count: number;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

const FilterItem = ({ paramKey, value, count, checked, onCheckedChange }: FilterItemProps) => {
  return (
    <li className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Checkbox
          id={`${paramKey}-${value}`}
          aria-describedby={`${paramKey}-${value}-count`}
          checked={checked}
          className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          onCheckedChange={(state) => onCheckedChange(state === true)}
        />
        <Label htmlFor={`${paramKey}-${value}`} className="text-sm text-muted-foreground">
          {value}
        </Label>
      </div>
      <span id={`${paramKey}-${value}-count`} className="text-sm text-muted-foreground">
        {count}
      </span>
    </li>
  );
};

export default FilterItem;
