import { TransactionRepository } from '../transaction/repository.js';
import { OperationRepository } from './repository.js';

export  class OperationUnitOfWork {

  #db;

  constructor( db ) {
    this.#db = db;
  };

  async transaction( callback ) {
    return await this.#db.transaction( async tx => {
      const repositories = { operation: new OperationRepository( tx ), transaction: new TransactionRepository( tx ) };
      return await callback( repositories );
    } );
  };

}
