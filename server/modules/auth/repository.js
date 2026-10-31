export class AuthRepository {

  #db;

  constructor( db ) {
    this.#db = db;
  };

  async create( data, tx = this.#db ) {
    return await tx.orm.public.Auth.create( data );
  };

  async findOne( where, tx = this.#db ) {
    return await tx.orm.public.Auth.where( where ).first();
  };

  async update( where, data, tx = this.#db ) {
    return await tx.orm.public.Auth.where( where ).update( data );
  };

}
