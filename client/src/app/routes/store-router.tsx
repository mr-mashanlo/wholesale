import type { RouteObject } from 'react-router';

import { cartRouter } from '@/pages/cart/list';
import { ordersRouter } from '@/pages/order/list';
import { productRouter } from '@/pages/product/detail';
import { productsRouter } from '@/pages/product/list';

import { StoreLayout } from '../layouts';

export const storeRouter: RouteObject = {
  children: [
    {
      element: <StoreLayout />,
      children: [ cartRouter, ordersRouter, productRouter, productsRouter ]
    }
  ]
};