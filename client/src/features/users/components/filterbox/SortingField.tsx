import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type Option<T extends string> = {
  value: T;
  label: string;
};

type SortingFieldProps<T extends string> = {
  value: T;
  placeholder: string;
  className?: string;
  options: Option<T>[];
  onChange: (value: T) => void;
};

const SortingField = <T extends string>({
  value,
  placeholder,
  className,
  options,
  onChange,
}: SortingFieldProps<T>) => {
  return (
    <Select value={value} onValueChange={(next) => onChange(next as T)}>
      <SelectTrigger
        aria-label={placeholder}
        className={cn('w-fit rounded-none border-gray-300 bg-white shadow-none', className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="rounded-none">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="cursor-pointer rounded-none focus:bg-transparent focus:text-foreground"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortingField;
