import { createBrowserRouter } from 'react-router';

import { authRouter } from './auth-router';
import { mainRouter } from './main-router';
import { storeRouter } from './store-router';

export const router = createBrowserRouter( [ { children: [ authRouter, storeRouter, mainRouter ] } ] );