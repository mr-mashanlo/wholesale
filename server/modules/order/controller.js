export class OrderController {

  constructor( orderService ) {
    this.orderService = orderService;
  };

  createOrder = async ( req, res, next ) => {
    try {
      const order = await this.orderService.createOrder( { ...req.body, userId: req.user.userId } );
      res.json( order );
    } catch ( error ) {
      next( error );
    }
  };

  getOrders = async ( req, res, next ) => {
    try {
      const { order, sort, limit, page, ...filter } = res.locals.query;
      const orders = await this.orderService.getOrders( { filter: { ...filter, userId: req.user.userId }, sort: { order, sort }, pagination: { limit, page, skip: ( page - 1 ) * limit } } );
      res.json( orders );
    } catch ( error ) {
      next( error );
    }
  };

  getOrder = async ( req, res, next ) => {
    try {
      const order = await this.orderService.getOrder( req.params );
      res.json( order );
    } catch ( error ) {
      next( error );
    }
  };

  updateOrder = async ( req, res, next ) => {
    try {
      const order = await this.orderService.updateOrder( req.params, req.body );
      res.json( order );
    } catch ( error ) {
      next( error );
    }
  };

};
