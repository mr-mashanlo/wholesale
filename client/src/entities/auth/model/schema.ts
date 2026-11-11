import { z } from 'zod';

export const AuthSchema = z.object( {
  id: z.string()
} );

export const SignInSchema = z.object( {
  email: z.email( { error: 'Email has invalid format' } ),
  password: z.string().min( 8, 'Password must be ≥ 8 characters' )
} );

export const SignUpSchema = SignInSchema.extend( {
  name: z.string()
} );

export type Auth = z.infer<typeof AuthSchema>;

export type SignInDTO = z.infer<typeof SignInSchema>;

export type SignUpDTO = z.infer<typeof SignUpSchema>;
