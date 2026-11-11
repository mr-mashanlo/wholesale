import { type FC } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';

import { TopProgressBar } from '@/shared/ui/top-progress-bar';

export const StoreLayout: FC = () => {
  return (
    <>
      <ScrollRestoration />
      <TopProgressBar />
      <Outlet />
    </>
  );
};

export default StoreLayout;