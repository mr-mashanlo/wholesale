import { Router } from 'express';

import { isAuth } from '../../middlewares/is-auth.js';
import { validateBody, validateQuery } from '../../middlewares/validate.js';
import { orderController } from './index.js';
import { OrderSchema, QuerySchema } from './schema.js';

const router = Router();

router.post( '/', isAuth, validateBody( OrderSchema ), ( req, res, next ) => orderController.createOrder( req, res, next ) );
router.get( '/', isAuth, validateQuery( QuerySchema ), ( req, res, next ) => orderController.getOrders( req, res, next ) );
router.get( '/:id', isAuth, ( req, res, next ) => orderController.getOrder( req, res, next ) );
router.put( '/:id', isAuth, validateBody( OrderSchema ), ( req, res, next ) => orderController.updateOrder( req, res, next ) );

export { router as orderRouter };
