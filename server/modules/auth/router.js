import { Router } from 'express';

import { validateBody } from '../../middlewares/validate.js';
import { authController } from './index.js';
import { SignInSchema, SignUpSchema } from './schema.js';

const router = Router();

router.post( '/signin', validateBody( SignInSchema ), ( req, res, next ) => authController.signIn( req, res, next ) );
router.post( '/signup', validateBody( SignUpSchema ), ( req, res, next ) => authController.signUp( req, res, next ) );

export { router as authRouter };
