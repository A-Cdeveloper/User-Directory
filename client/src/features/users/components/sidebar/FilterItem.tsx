import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const FilterItem = ({ value, count }: { value: string; count: number }) => {
  return (
    <li className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Checkbox
          id={value}
          aria-describedby={value}
          className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
        />
        <Label htmlFor={value} className="text-sm text-muted-foreground">
          {value}
        </Label>
      </div>
      <span id={value} className="text-sm text-muted-foreground">
        {count}
      </span>
    </li>
  );
};

export default FilterItem;
