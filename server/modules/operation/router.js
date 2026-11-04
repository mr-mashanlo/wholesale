import { Router } from 'express';

import { isAuth } from '../../middlewares/is-auth.js';
import { validateBody, validateQuery } from '../../middlewares/validate.js';
import { operationController } from './index.js';
import { OperationSchema, QuerySchema } from './schema.js';

const router = Router();

router.post( '/', isAuth, validateBody( OperationSchema ), ( req, res, next ) => operationController.createOperation( req, res, next ) );
router.get( '/', isAuth, validateQuery( QuerySchema ), ( req, res, next ) => operationController.getOperations( req, res, next ) );
router.get( '/:id', isAuth, ( req, res, next ) => operationController.getOperation( req, res, next ) );
router.put( '/:id', isAuth, validateBody( OperationSchema ), ( req, res, next ) => operationController.updateOperation( req, res, next ) );

export { router as operationRouter };
