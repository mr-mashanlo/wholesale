import type { RouteObject } from 'react-router';

import { signInRouter } from '@/pages/sign-in';
import { signUpRouter } from '@/pages/sign-up';

import { ClearLayout } from '../layouts';

export const authRouter: RouteObject = {
  children: [
    {
      element: <ClearLayout />,
      children: [ signInRouter, signUpRouter ]
    }
  ]
};