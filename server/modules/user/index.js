import { db } from '../../prisma/db.js';
import { UserController  } from './controller.js';
import { UserRepository } from './repository.js';
import { UserService } from './service.js';

const userRepository = new UserRepository( db );
const userService = new UserService( userRepository );
export const userController = new UserController( userService );
