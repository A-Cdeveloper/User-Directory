import { Suspense } from 'react';
import { Outlet } from 'react-router';

const AppLayout = () => {
  return (
    <Suspense fallback={<p className="p-4 text-muted-foreground">Loading...</p>}>
      <Outlet />
    </Suspense>
  );
};

export default AppLayout;
