import { useQuery } from '@tanstack/react-query';

import { productService } from '../api/api';

export const useProduct = ( slug: string ) => {

  const product = useQuery( {
    queryKey: [ 'product', slug ],
    queryFn: () => productService.getProductSlug( slug ),
    placeholderData: data => data
  } );

  return { product };

};