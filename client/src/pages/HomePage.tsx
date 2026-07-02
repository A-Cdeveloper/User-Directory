import Sidebar from '@/components/layout/Sidebar';
import MainContent from '@/components/layout/MainContent';
import FilterSidebar from '@/features/users/components/sidebar/FilterSidebar';
import FilterBox from '@/features/users/components/filterbox/FilterBox';
import UsersList from '@/features/users/components/UsersList';

const HomePage = () => {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 py-4 md:flex-row md:gap-0">
      <Sidebar>
        <FilterSidebar />
      </Sidebar>

      <MainContent>
        <FilterBox />
        <UsersList />
      </MainContent>
    </div>
  );
};

export default HomePage;
