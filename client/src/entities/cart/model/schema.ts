import z from 'zod';

export const CartSchema = z.object( {
  productId: z.string(),
  name: z.string(),
  amount: z.number(),
  price: z.number()
} );

export const CartDTOSchema = CartSchema;

export type Cart = z.infer<typeof CartSchema>;

export type CartDTO = z.infer<typeof CartDTOSchema>;