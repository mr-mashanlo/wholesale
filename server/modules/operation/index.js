import { db } from '../../prisma/db.js';
import { OperationController } from './controller.js';
import { OperationRepository } from './repository.js';
import { OperationService } from './service.js';
import { OperationUnitOfWork } from './unit-of-work.js';

export const operationRepository = new OperationRepository( db );
const operationUnitOfWork = new OperationUnitOfWork( db );
const operationService = new OperationService( operationRepository, operationUnitOfWork );
export const operationController = new OperationController( operationService );
