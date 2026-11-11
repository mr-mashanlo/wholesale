export class UserRepository {

  #db;

  constructor( db ) {
    this.#db = db;
  };

  async count( where ) {
    return await this.#db.orm.public.User.where( where ).aggregate( a => ( { total: a.count() } ) );
  };

  async create( data ) {
    return await this.#db.orm.public.User.create( data );
  };

  async delete( where ) {
    return await this.#db.orm.public.User.where( where ).delete();
  };

  async find( { filter, sort, pagination } ) {
    return await this.#db.orm.public.User.where( filter ).orderBy( p => p[sort.sort][sort.order]() ).limit( pagination.limit ).offset( pagination.skip ).all();
  };

  async findOne( where ) {
    return await this.#db.orm.public.User.where( where ).first();
  };

  async update( where, data ) {
    return await this.#db.orm.public.User.where( where ).update( data );
  };

}
