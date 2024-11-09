import { Outlet } from 'react-router-dom';

import { StoreLayout } from '@/components/layouts';

export const AppRoot = () => {
  return (
    <StoreLayout>
      <Outlet />
    </StoreLayout>
  );
};

export const AppRootErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};
