import { type RouteObject } from 'react-router';

export const cartRouter: RouteObject = {
  path: '/cart',
  lazy: {
    Component: async () => { return ( await import( '../ui/page' ) ).CartPage; }
  },
  hydrateFallbackElement: <div className="w-screen h-screen bg-zinc-50 dark:bg-zinc-900 fixed top-0 left-0 z-40" />
};