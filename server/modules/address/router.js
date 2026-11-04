import { Router } from 'express';

import { isAuth } from '../../middlewares/is-auth.js';
import { validateBody, validateQuery } from '../../middlewares/validate.js';
import { addressController } from './index.js';
import { AddressSchema, QuerySchema } from './schema.js';

const router = Router();

router.post( '/', isAuth, validateBody( AddressSchema ), ( req, res, next ) => addressController.createAddress( req, res, next ) );
router.get( '/', isAuth, validateQuery( QuerySchema ), ( req, res, next ) => addressController.getAddresses( req, res, next ) );
router.get( '/:id', isAuth, ( req, res, next ) => addressController.getAddress( req, res, next ) );
router.put( '/:id', isAuth, validateBody( AddressSchema ), ( req, res, next ) => addressController.updateAddress( req, res, next ) );

export { router as addressRouter };
