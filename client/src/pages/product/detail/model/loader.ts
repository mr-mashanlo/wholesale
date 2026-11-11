import { type LoaderFunction } from 'react-router';

import { productService } from '@/entities/product';
import { queryClient } from '@/shared/lib';

export const productLoader: LoaderFunction = async ( { params } ) => {
  return await queryClient.ensureQueryData( {
    queryKey: [ 'product', params.slug ],
    queryFn: () => productService.getProductSlug( params.slug || '' )
  } );
};