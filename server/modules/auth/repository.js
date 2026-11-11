export class AuthRepository {

  #db;

  constructor( db ) {
    this.#db = db;
  };

  async create( data ) {
    return await this.#db.orm.public.Auth.create( data );
  };

  async findOne( where ) {
    return await this.#db.orm.public.Auth.where( where ).first();
  };

  async update( where, data ) {
    return await this.#db.orm.public.Auth.where( where ).update( data );
  };

}
