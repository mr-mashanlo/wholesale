import { z } from 'zod';

const Product = z.object( {
  productId: z.string(),
  amount: z.number(),
  price: z.number()
} );

const Address = z.object( {
  state: z.string(),
  city: z.string(),
  address: z.string()
} );

export const OrderSchema = z.object( {
  products: z.array( Product ),
  address: Address
} );

const FilteringSchema = OrderSchema.omit( { products: true } ).extend( {
  id: z.string()
} ).partial();

const SortingSchema = z.object( {
  order: z.enum( [ 'asc', 'desc' ] ).default( 'asc' ),
  sort: z.enum( [ 'id', 'userId', 'status', 'createdAt' ] ).default( 'createdAt' )
} );

const PaginationSchema = z.object( {
  limit: z.string().transform( v => Number( v < 1 ? 0 : v ) ).default( 10 ),
  page: z.string().transform( v => Number( v < 1 ? 1 : v ) ).default( 1 )
} );

export const QuerySchema = z.object( {
  ...FilteringSchema.shape,
  ...SortingSchema.shape,
  ...PaginationSchema.shape
} );
