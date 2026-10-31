import { Router } from 'express';

import { isAuth } from '../../middlewares/is-auth.js';
import { validate } from '../../middlewares/validate.js';
import { userController } from './index.js';
import { UserSchema } from './schema.js';

const router = Router();

router.post( '/', isAuth, validate( UserSchema ), ( req, res, next ) => userController.createUser( req, res, next ) );
router.get( '/', ( req, res, next ) => userController.getUsers( req, res, next ) );
router.get( '/:id', ( req, res, next ) => userController.getUser( req, res, next ) );
router.put( '/:id', isAuth, validate( UserSchema ), ( req, res, next ) => userController.updateUser( req, res, next ) );

export { router as userRouter };
