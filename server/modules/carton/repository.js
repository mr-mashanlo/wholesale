export class CartonRepository {

  #db;

  constructor( db ) {
    this.#db = db;
  };

  async count( where = {}, tx = this.#db ) {
    return await tx.orm.public.Carton.where( where ).aggregate( a => ( { total: a.count() } ) );
  };

  async delete( where, tx = this.#db ) {
    return await tx.orm.public.Carton.where( where ).delete();
  };

  async create( data, tx = this.#db ) {
    return await tx.orm.public.Carton.create( data );
  };

  async find( { filter, sort, pagination } = {}, tx = this.#db ) {
    return await tx.orm.public.Carton.where( filter ).orderBy( p => p[sort.sort][sort.order]() ).limit( pagination.limit ).offset( pagination.skip ).all();
  };

  async findOne( where = {}, tx = this.#db ) {
    return await tx.orm.public.Carton.where( where ).first();
  };

}
