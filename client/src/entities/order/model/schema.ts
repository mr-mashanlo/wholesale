import { z } from 'zod';

import { type PaginatedResponse } from '@/shared/type';

const Item = z.object( {
  productId: z.string(),
  amount: z.number(),
  price: z.number(),
  name: z.string()
} );

const Address = z.object( {
  state: z.string(),
  city: z.string(),
  address: z.string()
} );

export const OrderSchema = z.object( {
  id: z.string(),
  userId: z.string(),
  status: z.enum( [ 'PENDING', 'DELIVERING', 'CANCELLED', 'COMPLETED' ] ),
  createdAt: z.string(),
  items: z.array( Item ),
  address: Address
} );

export const OrderDTOSchema = OrderSchema.pick( { items: true, address: true } );

export type Order = z.infer<typeof OrderSchema>;

export type OrderDTO = z.infer<typeof OrderDTOSchema>;

export type PaginatedOrder = PaginatedResponse<Order>