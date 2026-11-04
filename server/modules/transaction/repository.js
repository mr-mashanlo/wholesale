export class TransactionRepository {

  #db;

  constructor( db ) {
    this.#db = db;
  };

  async count( where = {}, tx = this.#db ) {
    return await tx.orm.public.Transaction.where( where ).aggregate( a => ( { total: a.count() } ) );
  };

  async create( data, tx = this.#db ) {
    return await tx.orm.public.Transaction.createAll( data );
  };

  async find( { filter, sort, pagination } = {}, tx = this.#db ) {
    return await tx.orm.public.Transaction.where( filter ).orderBy( p => p[sort.sort][sort.order]() ).limit( pagination.limit ).offset( pagination.skip ).all();
  };

  async findOne( where = {}, tx = this.#db ) {
    return await tx.orm.public.Transaction.where( where ).first();
  };

}
