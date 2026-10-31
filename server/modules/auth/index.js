import { db } from '../../prisma/db.js';
import { userRepository } from '../user/index.js';
import { AuthController } from './controller.js';
import { PasswordService } from './lib/password-service.js';
import { TokenService } from './lib/token-service.js';
import { AuthRepository } from './repository.js';
import { AuthService } from './service.js';

const passwordService = new PasswordService();
const tokenService = new TokenService( process.env.ACCESS_KEY, process.env.JWT_ACCESS_TIME );
const authRepository = new AuthRepository( db );
const authService = new AuthService( db, authRepository, userRepository, tokenService, passwordService );
export const authController = new AuthController( authService, tokenService );
