import { useQuery } from '@tanstack/react-query';

import { orderService } from '../api/api';

export const useOrders = ( params?: Record<string, string> ) => {

  const orders = useQuery( {
    queryKey: [ 'orders', params ],
    queryFn: () => orderService.getOrders( params ),
    placeholderData: data => data
  } );

  return { orders };

};