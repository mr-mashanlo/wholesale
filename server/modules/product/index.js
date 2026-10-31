import { db } from '../../prisma/db.js';
import { ProductController } from './controller.js';
import { ProductRepository } from './repository.js';
import { ProductService } from './service.js';

const productRepository = new ProductRepository( db );
const productService = new ProductService( productRepository );
export const productController = new ProductController( productService );
