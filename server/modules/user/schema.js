import { z } from 'zod';

export const UserSchema = z.object( {
  name: z.string().min( 3, 'Name must be ≥ 3 characters' ),
  role: z.enum( [ 'ADMIN', 'MODERATOR', 'CUSTOMER', 'SUPPLIER' ] )
} );

export const FilteringSchema = UserSchema.extend( {
  id: z.string(),
  archived: z.xor( [ z.string(), z.boolean() ] ).transform( v => v === 'true' ? true : false )
} ).partial();

export const SortingSchema = z.object( {
  order: z.enum( [ 'asc', 'desc' ] ).default( 'asc' ),
  sort: z.enum( [ 'id', 'name', 'role', 'createdAt' ] ).default( 'createdAt' )
} ).transform( v => p => p[v.sort][v.order]() );

export const PaginationSchema = z.object( {
  limit: z.string().transform( v => Number( v < 1 ? 0 : v ) ).default( 10 ),
  page: z.string().transform( v => Number( v < 1 ? 1 : v ) ).default( 1 )
} ).transform( v => ( { ...v, skip: ( v.page - 1 ) * v.limit } ) );
