import ErrorMessage from '@/components/layout/ErrorMessage';
import MainContent from '@/components/layout/MainContent';
import Sidebar from '@/components/layout/Sidebar';
import HomePageSkeleton from '@/components/layout/skeletons/HomePageSkeleton';
import FilterBox from '@/features/users/components/filterbox/FilterBox';
import FilterSidebar from '@/features/users/components/sidebar/FilterSidebar';
import UsersList from '@/features/users/components/UsersList';
import { DEFAULT_SORT_BY, DEFAULT_SORT_DIR } from '@/features/users/constants';
import { useUsers } from '@/features/users/hooks/useUsers';
import { useDebounce } from '@/hooks/useDebounce';
import { useUrlParams } from '@/hooks/useUrlParams';
import type { SortBy, SortDir } from '@/types/users';

const HomePage = () => {
  const { getListParam, getParam } = useUrlParams();
  const nationalities = getListParam('nationalities');
  const hobbies = getListParam('hobbies');
  const sortBy = (getParam('sortBy') || DEFAULT_SORT_BY) as SortBy;
  const sortDir = (getParam('sortDir') || DEFAULT_SORT_DIR) as SortDir;
  const search = getParam('search');
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useUsers({
    limit: 20,
    nationalities,
    hobbies,
    sortBy,
    sortDir,
    search: debouncedSearch,
  });

  // Keep sidebar mounted while filters refetch (avoid skeleton flash)
  if (isLoading && !data) {
    return <HomePageSkeleton />;
  }

  if (error && !data) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 py-4 md:flex-row md:gap-0">
      <Sidebar>
        <FilterSidebar filters={data?.pages[0]?.filters} />
      </Sidebar>

      <MainContent>
        <FilterBox totalCount={data?.pages[0]?.pagination?.total ?? 0} />
        <UsersList
          // Remount on filter change so scroll resets to top
          key={`n:${nationalities.join(',')}|h:${hobbies.join(',')}|sb:${sortBy}|sd:${sortDir}|s:${debouncedSearch}`}
          users={data?.pages.flatMap((page) => page.users) ?? []}
          onFetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage ?? false}
          isFetchingNextPage={isFetchingNextPage}
        />
      </MainContent>
    </div>
  );
};

export default HomePage;
