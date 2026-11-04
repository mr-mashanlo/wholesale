import { db } from '../../prisma/db.js';
import { OrderItemRepository } from './repository.js';

export const orderItemRepository = new OrderItemRepository( db );
