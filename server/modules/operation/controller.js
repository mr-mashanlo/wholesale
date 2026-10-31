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
      const operations = await this.operationService.getOperations( req.query );
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
