import ErrorMessage from '@/components/layout/ErrorMessage';
import MainContent from '@/components/layout/MainContent';
import Sidebar from '@/components/layout/Sidebar';
import HomePageSkeleton from '@/components/layout/skeletons/HomePageSkeleton';
import FilterBox from '@/features/users/components/filterbox/FilterBox';
import FilterSidebar from '@/features/users/components/sidebar/FilterSidebar';
import UsersList from '@/features/users/components/UsersList';
import { useUsers } from '@/features/users/hooks/useUsers';

const HomePage = () => {
  const { data, isLoading, error } = useUsers({ limit: 100 });

  if (isLoading) {
    return <HomePageSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 py-4 md:flex-row md:gap-0">
      <Sidebar>
        <FilterSidebar filters={data?.filters} />
      </Sidebar>

      <MainContent>
        <FilterBox totalCount={data?.pagination?.total ?? 0} />
        <UsersList users={data?.users ?? []} />
      </MainContent>
    </div>
  );
};

export default HomePage;
