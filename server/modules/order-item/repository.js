export class OrderItemRepository {

  #db;

  constructor( db ) {
    this.#db = db;
  };

  async count( where = {}, tx = this.#db ) {
    return await tx.orm.public.OrderItem.where( where ).aggregate( a => ( { total: a.count() } ) );
  };

  async create( data, tx = this.#db ) {
    return await tx.orm.public.OrderItem.createAll( data );
  };

  async find( { filter, sort, pagination } = {}, tx = this.#db ) {
    return await tx.orm.public.OrderItem.where( filter ).orderBy( p => p[sort.sort][sort.order]() ).limit( pagination.limit ).offset( pagination.skip ).all();
  };

  async findOne( where = {}, tx = this.#db ) {
    return await tx.orm.public.OrderItem.where( where ).first();
  };

}
