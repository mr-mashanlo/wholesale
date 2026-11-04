import { Router } from 'express';

import { isAuth } from '../../middlewares/is-auth.js';
import { validateBody, validateQuery } from '../../middlewares/validate.js';
import { userController } from './index.js';
import { QuerySchema, UserSchema } from './schema.js';

const router = Router();

router.post( '/', isAuth, validateBody( UserSchema ), ( req, res, next ) => userController.createUser( req, res, next ) );
router.get( '/', isAuth, validateQuery( QuerySchema ), ( req, res, next ) => userController.getUsers( req, res, next ) );
router.get( '/:id', isAuth, ( req, res, next ) => userController.getUser( req, res, next ) );
router.put( '/:id', isAuth, validateBody( UserSchema ), ( req, res, next ) => userController.updateUser( req, res, next ) );

export { router as userRouter };
