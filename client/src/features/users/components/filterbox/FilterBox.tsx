const FilterBox = ({ totalCount }: { totalCount: number }) => {
  return (
    <div className="bg-slate-500 w-full h-1/6 p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Total: {totalCount}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterBox;
