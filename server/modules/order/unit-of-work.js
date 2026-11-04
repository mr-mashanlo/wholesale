import { OrderItemRepository } from '../order-item/repository.js';
import { OrderRepository } from './repository.js';

export  class OrderUnitOfWork {

  #db;

  constructor( db ) {
    this.#db = db;
  };

  async transaction( callback ) {
    return await this.#db.transaction( async tx => {
      const repositories = { order: new OrderRepository( tx ), orderItem: new OrderItemRepository( tx ) };
      return await callback( repositories );
    } );
  };

}
