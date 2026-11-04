import { z } from 'zod';

export const AddressSchema = z.object( {
  state: z.string(),
  city: z.string(),
  address: z.string(),
  active: z.boolean().optional()
} );

const FilteringSchema = AddressSchema.extend( {
  id: z.string()
} ).partial();

const SortingSchema = z.object( {
  order: z.enum( [ 'asc', 'desc' ] ).default( 'asc' ),
  sort: z.enum( [ 'id', 'state', 'city', 'active', 'createdAt' ] ).default( 'createdAt' )
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
