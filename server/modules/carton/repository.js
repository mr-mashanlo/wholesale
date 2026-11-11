export class CartonRepository {

  #db;

  constructor( db ) {
    this.#db = db;
  };

  async count( where ) {
    return await this.#db.orm.public.Carton.where( where ).aggregate( a => ( { total: a.count() } ) );
  };

  async delete( where ) {
    return await this.#db.orm.public.Carton.where( where ).delete();
  };

  async create( data ) {
    return await this.#db.orm.public.Carton.create( data );
  };

  async find( { filter, sort, pagination } ) {
    return await this.#db.orm.public.Carton.where( filter ).orderBy( p => p[sort.sort][sort.order]() ).limit( pagination.limit ).offset( pagination.skip ).all();
  };

  async findOne( where ) {
    return await this.#db.orm.public.Carton.where( where ).first();
  };

}
