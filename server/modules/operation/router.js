import { Router } from 'express';

import { isAuth } from '../../middlewares/is-auth.js';
import { validate } from '../../middlewares/validate.js';
import { operationController } from './index.js';
import { OperationSchema } from './schema.js';

const router = Router();

router.post( '/', isAuth, validate( OperationSchema ), ( req, res, next ) => operationController.createOperation( req, res, next ) );
router.get( '/', ( req, res, next ) => operationController.getOperations( req, res, next ) );
router.get( '/:id', ( req, res, next ) => operationController.getOperation( req, res, next ) );
router.put( '/:id', isAuth, validate( OperationSchema ), ( req, res, next ) => operationController.updateOperation( req, res, next ) );

export { router as operationRouter };
