import Sidebar from '@/components/layout/Sidebar';
import MainContent from '@/components/layout/MainContent';

const HomePage = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 py-4 md:flex-row md:gap-0">
      <Sidebar>
        <h3>Filters</h3>
      </Sidebar>

      <MainContent>
        <h3>Main Content</h3>
      </MainContent>
    </div>
  );
};

export default HomePage;
