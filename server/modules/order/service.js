import { FilteringSchema, PaginationSchema, SortingSchema } from './schema.js';

export class OrderService {

  constructor( orderRepository ) {
    this.orderRepository = orderRepository;
  };

  createOrder = async body => {
    return await this.orderRepository.create( body );
  };

  getOrders = async query => {
    const filter = FilteringSchema.parse( query );
    const sort = SortingSchema.parse( query );
    const pagination = PaginationSchema.parse( query );
    const data = await this.orderRepository.find( { filter, sort, pagination } );
    const total = await this.orderRepository.count( filter );
    return { data, ...total, ...pagination };
  };

  getOrder = async query => {
    return await this.orderRepository.findOne( query );
  };

  updateOrder = async ( query, order ) => {
    return await this.orderRepository.update( query, order );
  };

};
