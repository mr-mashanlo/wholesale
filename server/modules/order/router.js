import { Router } from 'express';

import { isAuth } from '../../middlewares/is-auth.js';
import { validate } from '../../middlewares/validate.js';
import { orderController } from './index.js';
import { OrderSchema } from './schema.js';

const router = Router();

router.post( '/', isAuth, validate( OrderSchema ), ( req, res, next ) => orderController.createOrder( req, res, next ) );
router.get( '/', isAuth, ( req, res, next ) => orderController.getOrders( req, res, next ) );
router.get( '/:id', isAuth, ( req, res, next ) => orderController.getOrder( req, res, next ) );
router.put( '/:id', isAuth, validate( OrderSchema ), ( req, res, next ) => orderController.updateOrder( req, res, next ) );

export { router as orderRouter };
