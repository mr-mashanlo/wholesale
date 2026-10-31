import { db } from '../../prisma/db.js';
import { OrderController } from './controller.js';
import { OrderRepository } from './repository.js';
import { OrderService } from './service.js';

const orderRepository = new OrderRepository( db );
const orderService = new OrderService( orderRepository );
export const orderController = new OrderController( orderService );
