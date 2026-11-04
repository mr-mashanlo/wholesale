export class OperationController {

  constructor( operationService ) {
    this.operationService = operationService;
  };

  createOperation = async ( req, res, next ) => {
    try {
      const operation = await this.operationService.createOperation( req.body );
      res.json( operation );
    } catch ( error ) {
      next( error );
    }
  };

  getOperations = async ( req, res, next ) => {
    try {
      const { order, sort, limit, page, ...filter } = res.locals.query;
      const operations = await this.operationService.getOperations( { filter, sort: { order, sort }, pagination: { limit, page, skip: ( page - 1 ) * limit } } );
      res.json( operations );
    } catch ( error ) {
      next( error );
    }
  };

  getOperation = async ( req, res, next ) => {
    try {
      const operation = await this.operationService.getOperation( req.params );
      res.json( operation );
    } catch ( error ) {
      next( error );
    }
  };

  updateOperation = async ( req, res, next ) => {
    try {
      const operation = await this.operationService.updateOperation( req.params, req.body );
      res.json( operation );
    } catch ( error ) {
      next( error );
    }
  };

};
