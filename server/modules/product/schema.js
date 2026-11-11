import { z } from 'zod';

const Dimensions = z.object( {
  length: z.number(),
  width: z.number(),
  height: z.number(),
  weight: z.number()
} );

export const ProductSchema = z.object( {
  name: z.string().min( 3, 'Name must be ≥ 3 characters' ),
  sku: z.string().optional(),
  dimensions: Dimensions.optional()
} );

const FilteringSchema = ProductSchema.omit( { dimensions: true } ).extend( {
  id: z.string(),
  archived: z.xor( [ z.string(), z.boolean() ] ).transform( v => v === 'true' ? true : false )
} ).partial();

const SortingSchema = z.object( {
  order: z.enum( [ 'asc', 'desc' ] ).default( 'asc' ),
  sort: z.enum( [ 'id', 'name', 'sku', 'createdAt' ] ).default( 'createdAt' )
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
