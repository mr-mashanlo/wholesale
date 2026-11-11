import { db } from '../../prisma/db.js';
import { CartonController } from './controller.js';
import { CartonRepository } from './repository.js';
import { CartonService } from './service.js';

const cartonRepository = new CartonRepository( db );
const cartonService = new CartonService( cartonRepository );
export const cartonController = new CartonController( cartonService );
