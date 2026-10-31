import { db } from '../../prisma/db.js';
import { TransactionRepository } from './repository.js';

export const transactionRepository = new TransactionRepository( db );
