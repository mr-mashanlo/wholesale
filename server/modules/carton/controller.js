export class CartonController {

  constructor( cartonService ) {
    this.cartonService = cartonService;
  };

  createCarton = async ( req, res, next ) => {
    try {
      const carton = await this.cartonService.createCarton( req.body );
      res.json( carton );
    } catch ( error ) {
      next( error );
    }
  };

  deleteCarton = async ( req, res, next ) => {
    try {
      const carton = await this.cartonService.deleteCarton( req.query );
      res.json( carton );
    } catch ( error ) {
      next( error );
    }
  };

  getCartons = async ( req, res, next ) => {
    try {
      const { order, sort, limit, page, ...filter } = res.locals.query;
      const cartons = await this.cartonService.getCartons( { filter, sort: { order, sort }, pagination: { limit, page, skip: ( page - 1 ) * limit } } );
      res.json( cartons );
    } catch ( error ) {
      next( error );
    }
  };

  getCarton = async ( req, res, next ) => {
    try {
      const carton = await this.cartonService.getCarton( req.params );
      res.json( carton );
    } catch ( error ) {
      next( error );
    }
  };

  updateCarton = async ( req, res, next ) => {
    try {
      const carton = await this.cartonService.updateCarton( req.params, req.body );
      res.json( carton );
    } catch ( error ) {
      next( error );
    }
  };

};
