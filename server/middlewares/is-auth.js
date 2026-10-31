import { authController } from '../modules/auth/index.js';

export const isAuth = ( req, res, next ) => authController.refreshToken( req, res, next );
