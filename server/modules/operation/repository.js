export class OperationRepository {

  #db;

  constructor( db ) {
    this.#db = db;
  };

  async count( where ) {
    return await this.#db.orm.public.Operation.where( where ).aggregate( a => ( { total: a.count() } ) );
  };

  async create( data ) {
    return await this.#db.orm.public.Operation.create( data );
  };

  async find( { filter, sort, pagination } ) {
    return await this.#db.orm.public.Operation.where( filter ).orderBy( p => p[sort.sort][sort.order]() ).limit( pagination.limit ).offset( pagination.skip ).all();
  };

  async findOne( where ) {
    return await this.#db.orm.public.Operation.where( where ).first();
  };

  async update( where, data ) {
    return await this.#db.orm.public.Operation.where( where ).update( data );
  };

}
