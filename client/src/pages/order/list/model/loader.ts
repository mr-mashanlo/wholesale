import { type LoaderFunction } from 'react-router';

import { queryClient } from '@/shared/lib';

export const ordersLoader: LoaderFunction = async ( { request } ) => {
  const url = new URL( request.url );
  const searchParams = Object.fromEntries( url.searchParams.entries() );
  return await queryClient.ensureQueryData( {
    queryKey: [ 'orders', searchParams ]
  } );
};