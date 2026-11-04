export class AddressController {

  constructor( addressService ) {
    this.addressService = addressService;
  };

  createAddress = async ( req, res, next ) => {
    try {
      const address = await this.addressService.createAddress( { ...req.body, userId: req.user.userId } );
      res.json( address );
    } catch ( error ) {
      next( error );
    }
  };

  deleteAddress = async ( req, res, next ) => {
    try {
      const address = await this.addressService.deleteAddress( req.query );
      res.json( address );
    } catch ( error ) {
      next( error );
    }
  };

  getAddresses = async ( req, res, next ) => {
    try {
      const { order, sort, limit, page, ...filter } = res.locals.query;
      const addresses = await this.addressService.getAddresses( { filter, sort: { order, sort }, pagination: { limit, page, skip: ( page - 1 ) * limit } } );
      res.json( addresses );
    } catch ( error ) {
      next( error );
    }
  };

  getAddress = async ( req, res, next ) => {
    try {
      const address = await this.addressService.getAddress( req.params );
      res.json( address );
    } catch ( error ) {
      next( error );
    }
  };

  updateAddress = async ( req, res, next ) => {
    try {
      const address = await this.addressService.updateAddress( req.params, req.body );
      res.json( address );
    } catch ( error ) {
      next( error );
    }
  };

};
