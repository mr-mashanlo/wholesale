import { z } from 'zod';

const Product = z.object( {
  productId: z.string(),
  amount: z.number()
} );

export const OperationSchema = z.object( {
  type: z.enum( [ 'INBOUND', 'RETURN', 'OUTBOUND', 'ADJUSTMENT' ] ),
  status: z.enum( [ 'CANCELLED', 'COMPLETED' ] ),
  products: z.array( Product )
} );

const FilteringSchema = OperationSchema.omit( { products: true } ).extend( {
  id: z.string()
} ).partial();

const SortingSchema = z.object( {
  order: z.enum( [ 'asc', 'desc' ] ).default( 'asc' ),
  sort: z.enum( [ 'id', 'type', 'status', 'createdAt' ] ).default( 'createdAt' )
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
