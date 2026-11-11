export class ProductRepository {

  #db;

  constructor( db ) {
    this.#db = db;
  };

  async count( where ) {
    return await this.#db.orm.public.Product.where( where ).aggregate( a => ( { total: a.count() } ) );
  };

  async create( data ) {
    return await this.#db.orm.public.Product.create( data );
  };

  async delete( where ) {
    return await this.#db.orm.public.Product.where( where ).delete();
  };

  async find( { filter, sort, pagination } ) {
    return await this.#db.orm.public.Product.where( filter ).orderBy( p => p[sort.sort][sort.order]() ).limit( pagination.limit ).offset( pagination.skip ).all();
  };

  async findOne( where ) {
    return await this.#db.orm.public.Product.where( where ).include( 'carton' ).first();
  };

  async update( where, data ) {
    return await this.#db.orm.public.Product.where( where ).update( data );
  };

}
