import { Router } from 'express';

import { validate } from '../../middlewares/validate.js';
import { authController } from './index.js';
import { SignInSchema, SignUpSchema } from './schema.js';

const router = Router();

router.post( '/signin', validate( SignInSchema ), ( req, res, next ) => authController.signIn( req, res, next ) );
router.post( '/signup', validate( SignUpSchema ), ( req, res, next ) => authController.signUp( req, res, next ) );

export { router as authRouter };
