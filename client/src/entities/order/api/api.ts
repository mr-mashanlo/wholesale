import { kyInstance } from '@/shared/lib';

import { type Order, type OrderDTO, type PaginatedOrder } from '../model/schema';

class OrderService {

  createOrder = ( data: OrderDTO ): Promise<Order> => {
    return kyInstance.post( 'orders', { json: data } ).json();
  };

  getOrders = ( searchParams?: Record<string, string> ): Promise<PaginatedOrder> => {
    return kyInstance.get( 'orders', { searchParams } ).json();
  };

  getOrderById = async ( id: string ): Promise<Order> => {
    return kyInstance.get( `orders/${id}` ).json();
  };

}

export const orderService = new OrderService();