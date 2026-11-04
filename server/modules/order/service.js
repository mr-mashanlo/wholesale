export class OrderService {

  constructor( orderRepository, orderUnitOfWork ) {
    this.orderRepository = orderRepository;
    this.orderUnitOfWork = orderUnitOfWork;
  };

  createOrder = async ( { address, products, userId } ) => {
    return await this.orderUnitOfWork.transaction( async repository => {
      const order = await repository.order.create( { address, userId } );
      const productEntities = products.reduce( ( acc, item ) => [ ...acc, { ...item, orderId: order.id } ], [] );
      await repository.orderItem.create( productEntities );
      return order;
    } );
  };

  getOrders = async ( { filter, sort, pagination } ) => {
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
