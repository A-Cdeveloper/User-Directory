import AppRouterProvider from './router/AppRouterProvider';
import TanstackProvider from './tanstackquery/TanstackProvider';

const AppProviders = () => {
  return (
    <TanstackProvider>
      <AppRouterProvider />
    </TanstackProvider>
  );
};

export default AppProviders;
