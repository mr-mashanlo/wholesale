import { type RouteObject } from 'react-router';

export const productRouter: RouteObject = {
  path: '/products/:slug',
  lazy: {
    loader: async () => { return ( await import( './loader' ) ).productLoader; },
    Component: async () => { return ( await import( '../ui/page' ) ).ProductPage; }
  },
  hydrateFallbackElement: <div className="w-screen h-screen bg-zinc-50 dark:bg-zinc-900 fixed top-0 left-0 z-40" />
};