import { type RouteObject } from 'react-router';

export const productsRouter: RouteObject = {
  path: '/products',
  lazy: {
    loader: async () => { return ( await import( './loader' ) ).productsLoader; },
    Component: async () => { return ( await import( '../ui/page' ) ).ProductsPage; }
  },
  hydrateFallbackElement: <div className="w-screen h-screen bg-zinc-50 dark:bg-zinc-900 fixed top-0 left-0 z-40" />
};