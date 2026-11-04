import { UserRepository } from '../user/repository.js';
import { AuthRepository } from './repository.js';

export  class AuthUnitOfWork {

  #db;

  constructor( db ) {
    this.#db = db;
  };

  async transaction( callback ) {
    return await this.#db.transaction( async tx => {
      const repositories = { auth: new AuthRepository( tx ), user: new UserRepository( tx ) };
      return await callback( repositories );
    } );
  };

}
