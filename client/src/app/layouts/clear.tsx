import { type FC } from 'react';
import { Outlet } from 'react-router';

export const ClearLayout: FC = () => {
  return <Outlet />;
};

export default ClearLayout;