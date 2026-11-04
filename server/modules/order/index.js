import { db } from '../../prisma/db.js';
import { OrderController } from './controller.js';
import { OrderRepository } from './repository.js';
import { OrderService } from './service.js';
import { OrderUnitOfWork } from './unit-of-work.js';

const orderRepository = new OrderRepository( db );
const orderUnitOfWork = new OrderUnitOfWork( db );
const orderService = new OrderService( orderRepository, orderUnitOfWork );
export const orderController = new OrderController( orderService );
