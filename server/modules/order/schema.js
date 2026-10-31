import { z } from 'zod';

const ProductSchema = z.object( {
  productId: z.string(),
  name: z.string(),
  amount: z.number(),
  price: z.number()
} );

export const OrderSchema = z.object( {
  userId: z.string(),
  status: z.enum( [ 'PENDING', 'DELIVERING', 'CANCELLED', 'COMPLETED' ] ),
  products: z.array( ProductSchema )
} );

export const FilteringSchema = OrderSchema.omit( { products: true } ).extend( {
  id: z.string()
} ).partial();

export const SortingSchema = z.object( {
  order: z.enum( [ 'asc', 'desc' ] ).default( 'asc' ),
  sort: z.enum( [ 'id', 'userId', 'status', 'createdAt' ] ).default( 'createdAt' )
} ).transform( v => p => p[v.sort][v.order]() );

export const PaginationSchema = z.object( {
  limit: z.string().transform( v => Number( v < 1 ? 0 : v ) ).default( 10 ),
  page: z.string().transform( v => Number( v < 1 ? 1 : v ) ).default( 1 )
} ).transform( v => ( { ...v, skip: ( v.page - 1 ) * v.limit } ) );
