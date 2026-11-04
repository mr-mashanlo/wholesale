export class UserController {

  constructor( userService ) {
    this.userService = userService;
  };

  createUser = async ( req, res, next ) => {
    try {
      const user = await this.userService.createUser( req.body );
      res.json( user );
    } catch ( error ) {
      next( error );
    }
  };

  getUsers = async ( req, res, next ) => {
    try {
      const { order, sort, limit, page, ...filter } = res.locals.query;
      const users = await this.userService.getUsers( { filter, sort: { order, sort }, pagination: { limit, page, skip: ( page - 1 ) * limit } } );
      res.json( users );
    } catch ( error ) {
      next( error );
    }
  };

  getUser = async ( req, res, next ) => {
    try {
      const user = await this.userService.getUser( req.params );
      res.json( user );
    } catch ( error ) {
      next( error );
    }
  };

  updateUser = async ( req, res, next ) => {
    try {
      const user = await this.userService.updateUser( req.params, req.body );
      res.json( user );
    } catch ( error ) {
      next( error );
    }
  };

};
