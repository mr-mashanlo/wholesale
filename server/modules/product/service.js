import slug from 'slug';

import { FilteringSchema, PaginationSchema, SortingSchema } from './schema.js';

export class ProductService {

  constructor( productRepository ) {
    this.productRepository = productRepository;
  };

  createProduct = async body => {
    return await this.productRepository.create( { ...body, sku: slug( body.name ) } );
  };

  deleteProduct = async query => {
    return await this.productRepository.delete( query );
  };

  getProducts = async query => {
    const filter = FilteringSchema.parse( query );
    const sort = SortingSchema.parse( query );
    const pagination = PaginationSchema.parse( query );
    const data = await this.productRepository.find( { filter, sort, pagination } );
    const total = await this.productRepository.count( filter );
    return { data, ...total, ...pagination };
  };

  getProduct = async query => {
    return await this.productRepository.findOne( query );
  };

  updateProduct = async ( query, body ) => {
    return await this.productRepository.update( query, { ...body, sku: slug( body.name ) } );
  };

};
