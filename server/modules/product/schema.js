import { z } from 'zod';

const DimensionSchema = z.object( {
  length: z.number(),
  width: z.number(),
  height: z.number()
} );

const BoxSchema = z.object( {
  units: z.number(),
  weight: z.number(),
  dimensions: DimensionSchema
} );

export const ProductSchema = z.object( {
  name: z.string().min( 3, 'Name must be ≥ 3 characters' ),
  weight: z.number().optional(),
  dimensions: DimensionSchema.optional(),
  box: BoxSchema.optional()
} );

export const FilteringSchema = ProductSchema.omit( { weight: true, dimensions: true, box: true } ).extend( {
  id: z.string(),
  archived: z.xor( [ z.string(), z.boolean() ] ).transform( v => v === 'true' ? true : false )
} ).partial();

export const SortingSchema = z.object( {
  order: z.enum( [ 'asc', 'desc' ] ).default( 'asc' ),
  sort: z.enum( [ 'id', 'name', 'unit', 'createdAt' ] ).default( 'createdAt' )
} ).transform( v => p => p[v.sort][v.order]() );

export const PaginationSchema = z.object( {
  limit: z.string().transform( v => Number( v < 1 ? 0 : v ) ).default( 10 ),
  page: z.string().transform( v => Number( v < 1 ? 1 : v ) ).default( 1 )
} ).transform( v => ( { ...v, skip: ( v.page - 1 ) * v.limit } ) );
