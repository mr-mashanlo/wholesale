export class OrderRepository {

  #db;

  constructor( db ) {
    this.#db = db;
  };

  async count( where = {}, tx = this.#db ) {
    return await tx.orm.public.Order.where( where ).aggregate( a => ( { total: a.count() } ) );
  };

  async create( data, tx = this.#db ) {
    return await tx.orm.public.Order.create( data );
  };

  async delete( where, tx = this.#db ) {
    return await tx.orm.public.Order.where( where ).delete();
  };

  async find( { filter, sort, pagination } = {}, tx = this.#db ) {
    return await tx.orm.public.Order.where( filter ).orderBy( p => p[sort.sort][sort.order]() ).limit( pagination.limit ).offset( pagination.skip ).all();
  };

  async findOne( where = {}, tx = this.#db ) {
    return await tx.orm.public.Order.where( where ).first();
  };

  async update( where, data, tx = this.#db ) {
    return await tx.orm.public.Order.where( where ).update( data );
  };

}
