import { Router } from 'express';

import { isAuth } from '../../middlewares/is-auth.js';
import { validateBody, validateQuery } from '../../middlewares/validate.js';
import { cartonController } from './index.js';
import { CartonSchema, QuerySchema } from './schema.js';

const router = Router();

router.post( '/', isAuth, validateBody( CartonSchema ), ( req, res, next ) => cartonController.createCarton( req, res, next ) );
router.get( '/', validateQuery( QuerySchema ), ( req, res, next ) => cartonController.getCartons( req, res, next ) );
router.get( '/:slug', ( req, res, next ) => cartonController.getCarton( req, res, next ) );
router.delete( '/:id', isAuth, ( req, res, next ) => cartonController.deleteCarton( req, res, next ) );
router.put( '/:id', isAuth, validateBody( CartonSchema ), ( req, res, next ) => cartonController.updateCarton( req, res, next ) );

export { router as cartonRouter };
