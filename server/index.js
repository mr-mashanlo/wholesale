import 'dotenv/config';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import { slowDown } from 'express-slow-down';

import { errorHandler } from './middlewares/error-handler.js';
import { addressRouter } from './modules/address/router.js';
import { authRouter } from './modules/auth/router.js';
import { cartonRouter } from './modules/carton/router.js';
import { operationRouter } from './modules/operation/router.js';
import { orderRouter } from './modules/order/router.js';
import { productRouter } from './modules/product/router.js';
import { userRouter } from './modules/user/router.js';

const app = express();

const apiLimiter = rateLimit( {
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true
} );

const speedLimiter = slowDown( {
  windowMs: 15 * 60 * 1000,
  delayAfter: 50,
  delayMs: hits => ( hits - 50 ) * 500
} );

app.use( cors( { credentials: true, origin: [ process.env.FRONT_URL ] } ) );
app.use( cookieParser() );
app.use( express.json() );
app.use( express.static( 'uploads' ) );

app.use( apiLimiter );
app.use( speedLimiter );

app.use( '/api/auth', authRouter );
app.use ( '/api/users', userRouter );
app.use ( '/api/addresses', addressRouter );
app.use ( '/api/cartons', cartonRouter );
app.use ( '/api/products', productRouter );
app.use ( '/api/orders', orderRouter );
app.use ( '/api/operations', operationRouter );

app.use( errorHandler );

app.listen( process.env.PORT, () => console.log( `Server is running on port ${process.env.PORT}` ) );

export default app;
