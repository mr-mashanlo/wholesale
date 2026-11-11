import { type RouteObject } from 'react-router';

export const ordersRouter: RouteObject = {
  path: '/orders',
  lazy: {
    // loader: async () => { return ( await import( './loader' ) ).ordersLoader; },
    Component: async () => { return ( await import( '../ui/page' ) ).OrdersPage; }
  },
  hydrateFallbackElement: <div className="w-screen h-screen bg-zinc-50 dark:bg-zinc-900 fixed top-0 left-0 z-40" />
};