import slug from 'slug';

export class ProductController {

  constructor( productService ) {
    this.productService = productService;
  };

  createProduct = async ( req, res, next ) => {
    try {
      const product = await this.productService.createProduct( { ...req.body, slug: slug( req.body.name ) } );
      res.json( product );
    } catch ( error ) {
      next( error );
    }
  };

  deleteProduct = async ( req, res, next ) => {
    try {
      const product = await this.productService.deleteProduct( req.query );
      res.json( product );
    } catch ( error ) {
      next( error );
    }
  };

  getProducts = async ( req, res, next ) => {
    try {
      const { order, sort, limit, page, ...filter } = res.locals.query;
      const products = await this.productService.getProducts( { filter, sort: { order, sort }, pagination: { limit, page, skip: ( page - 1 ) * limit } } );
      res.json( products );
    } catch ( error ) {
      next( error );
    }
  };

  getProduct = async ( req, res, next ) => {
    try {
      const product = await this.productService.getProduct( req.params );
      res.json( product );
    } catch ( error ) {
      next( error );
    }
  };

  updateProduct = async ( req, res, next ) => {
    try {
      const product = await this.productService.updateProduct( req.params, { ...req.body, slug: slug( req.body.name ) } );
      res.json( product );
    } catch ( error ) {
      next( error );
    }
  };

};
