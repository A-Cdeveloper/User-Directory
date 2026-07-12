import { Skeleton } from '@/components/ui/skeleton';
import MainContent from '../MainContent';
import Sidebar from '../Sidebar';

const HomePageSkeleton = () => {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 py-4 md:flex-row md:gap-0">
      <Sidebar>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-full bg-slate-200 rounded-none" />
          <Skeleton className="h-8 w-full bg-slate-200 rounded-none" />
        </div>
      </Sidebar>

      <MainContent>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-32 w-full bg-slate-200 rounded-none" />
          <div className="flex flex-col gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-16 w-full bg-slate-200 rounded-none" />
            ))}
          </div>
        </div>
      </MainContent>
    </div>
  );
};

export default HomePageSkeleton;
