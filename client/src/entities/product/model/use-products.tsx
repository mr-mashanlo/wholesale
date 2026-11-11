import { useQuery } from '@tanstack/react-query';

import { productService } from '../api/api';

export const useProducts = ( params?: Record<string, string> ) => {

  const products = useQuery( {
    queryKey: [ 'products', params ],
    queryFn: () => productService.getProducts( params ),
    placeholderData: data => data
  } );

  return { products };

};