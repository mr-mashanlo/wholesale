export class ProductController {

  constructor( productService ) {
    this.productService = productService;
  };

  createProduct = async ( req, res, next ) => {
    try {
      const product = await this.productService.createProduct( req.body );
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
      const products = await this.productService.getProducts( req.query );
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
      const product = await this.productService.updateProduct( req.params, req.body );
      res.json( product );
    } catch ( error ) {
      next( error );
    }
  };

};
