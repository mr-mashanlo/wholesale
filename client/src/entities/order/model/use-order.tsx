import { useQuery } from '@tanstack/react-query';

import { orderService } from '../api/api';

export const useOrder = ( id: string ) => {

  const order = useQuery( {
    queryKey: [ 'order', id ],
    queryFn: () => orderService.getOrderById( id ),
    placeholderData: data => data
  } );

  return { order };

};