import type { RouteObject } from 'react-router';

import { homeRouter } from '@/pages/home';
import { notFoundRouter } from '@/pages/not-found';

import { ClearLayout } from '../layouts';

export const mainRouter: RouteObject = {
  children: [
    {
      element: <ClearLayout />,
      children: [ homeRouter, notFoundRouter ]
    }
  ]
};