import { db } from '../../prisma/db.js';
import { OperationController } from './controller.js';
import { OperationRepository } from './repository.js';
import { OperationService } from './service.js';

export const operationRepository = new OperationRepository( db );
const operationService = new OperationService( operationRepository );
export const operationController = new OperationController( operationService );
