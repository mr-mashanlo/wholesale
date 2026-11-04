export class ProductService {

  constructor( productRepository ) {
    this.productRepository = productRepository;
  };

  createProduct = async body => {
    return await this.productRepository.create( body );
  };

  deleteProduct = async query => {
    return await this.productRepository.delete( query );
  };

  getProducts = async ( { filter, sort, pagination } ) => {
    const data = await this.productRepository.find( { filter, sort, pagination } );
    const total = await this.productRepository.count( filter );
    return { data, ...total, ...pagination };
  };

  getProduct = async query => {
    return await this.productRepository.findOne( query );
  };

  updateProduct = async ( query, body ) => {
    return await this.productRepository.update( query, body );
  };

};
