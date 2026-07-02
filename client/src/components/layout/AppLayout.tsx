import { Outlet } from 'react-router';
import Header from './Header';

const AppLayout = () => {
  return (
    <div className="min-h-screen w-full bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex h-screen w-full max-w-5xl flex-col px-4">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
