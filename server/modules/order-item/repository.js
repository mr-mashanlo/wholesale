export class OrderItemRepository {

  #db;

  constructor( db ) {
    this.#db = db;
  };

  async count( where ) {
    return await this.#db.orm.public.OrderItem.where( where ).aggregate( a => ( { total: a.count() } ) );
  };

  async create( data ) {
    return await this.#db.orm.public.OrderItem.createAll( data );
  };

  async find( { filter, sort, pagination } ) {
    return await this.#db.orm.public.OrderItem.where( filter ).orderBy( p => p[sort.sort][sort.order]() ).limit( pagination.limit ).offset( pagination.skip ).all();
  };

  async findOne( where ) {
    return await this.#db.orm.public.OrderItem.where( where ).first();
  };

}
