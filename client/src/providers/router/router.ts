import AppLayout from '@/components/layout/AppLayout';
import HomePage from '@/pages/HomePage';

import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        path: '/',
        Component: HomePage,
      },
    ],
  },
]);
