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
      const users = await this.userService.getUsers( req.query );
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
