import { db } from '../../prisma/db.js';
import { AuthController } from './controller.js';
import { PasswordService } from './lib/password-service.js';
import { TokenService } from './lib/token-service.js';
import { AuthRepository } from './repository.js';
import { AuthService } from './service.js';
import { AuthUnitOfWork } from './unit-of-work.js';

const passwordService = new PasswordService();
const tokenService = new TokenService( process.env.ACCESS_KEY, process.env.JWT_ACCESS_TIME );
const authRepository = new AuthRepository( db );
const authUnitOfWork = new AuthUnitOfWork( db );
const authService = new AuthService( authRepository, authUnitOfWork, tokenService, passwordService );
export const authController = new AuthController( authService, tokenService );
