import { z } from 'zod';

import { type PaginatedResponse } from '@/shared/type';

const Dimensions = z.object( {
  length: z.number(),
  width: z.number(),
  height: z.number(),
  weight: z.number()
} );

const Carton = z.object( {
  units: z.number(),
  weight: z.number(),
  dimensions: Dimensions
} );

export const ProductSchema = z.object( {
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  sku: z.string().optional(),
  archived: z.boolean(),
  dimensions: Dimensions.optional(),
  carton: Carton.optional()
} );

export type Product = z.infer<typeof ProductSchema>;

export type PaginatedProduct = PaginatedResponse<Product>