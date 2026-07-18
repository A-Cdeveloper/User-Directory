import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type SearchInputProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

const SearchInput = ({ placeholder, value, onChange, className }: SearchInputProps) => {
  return (
    <Input
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'w-full rounded-none border border-gray-300 bg-white shadow-none placeholder:text-gray-500',
        className,
      )}
    />
  );
};

export default SearchInput;
