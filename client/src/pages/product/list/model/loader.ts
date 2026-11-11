import { type LoaderFunction } from 'react-router';

import { productService } from '@/entities/product';
import { queryClient } from '@/shared/lib';

export const productsLoader: LoaderFunction = async ( { request } ) => {
  const url = new URL( request.url );
  const searchParams = Object.fromEntries( url.searchParams.entries() );
  return await queryClient.ensureQueryData( {
    queryKey: [ 'products', searchParams ],
    queryFn: () => productService.getProducts( { limit: '9', archived: 'false', ...searchParams } )
  } );
};