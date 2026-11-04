import { Router } from 'express';

import { isAuth } from '../../middlewares/is-auth.js';
import { validateBody, validateQuery } from '../../middlewares/validate.js';
import { productController } from './index.js';
import { ProductSchema, QuerySchema } from './schema.js';

const router = Router();

router.post( '/', isAuth, validateBody( ProductSchema ), ( req, res, next ) => productController.createProduct( req, res, next ) );
router.get( '/', validateQuery( QuerySchema ), ( req, res, next ) => productController.getProducts( req, res, next ) );
router.get( '/:slug', ( req, res, next ) => productController.getProduct( req, res, next ) );
router.delete( '/:id', isAuth, ( req, res, next ) => productController.deleteProduct( req, res, next ) );
router.put( '/:id', isAuth, validateBody( ProductSchema ), ( req, res, next ) => productController.updateProduct( req, res, next ) );

export { router as productRouter };
