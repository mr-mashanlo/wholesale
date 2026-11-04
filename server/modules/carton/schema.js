import { z } from 'zod';

const Dimensions = z.object( {
  length: z.number(),
  width: z.number(),
  height: z.number()
} );

export const CartonSchema = z.object( {
  productId: z.string(),
  units: z.number(),
  weight: z.number(),
  dimensions: Dimensions
} );

const FilteringSchema = CartonSchema.omit( { weight: true, dimensions: true } ).extend( {
  id: z.string(),
  archived: z.xor( [ z.string(), z.boolean() ] ).transform( v => v === 'true' ? true : false )
} ).partial();

const SortingSchema = z.object( {
  order: z.enum( [ 'asc', 'desc' ] ).default( 'asc' ),
  sort: z.enum( [ 'id', 'units', 'weight', 'productId' ] ).default( 'id' )
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
