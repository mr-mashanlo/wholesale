import { Unauthorized } from '../../errors/unauthorized.js';

export class AuthController {

  constructor( authService, tokenService ) {
    this.authService = authService;
    this.tokenService = tokenService;
  };

  setCookies( res, accessToken, refreshToken ) {
    res.cookie( 'accessToken', accessToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
    res.cookie( 'refreshToken', refreshToken, { maxAge: process.env.COOKIE_REFRESH_TIME, httpOnly: true, sameSite: 'none', secure: true } );
  };

  async signIn( req, res, next ) {
    try {
      const { id, accessToken, refreshToken } = await this.authService.signIn( req.body );
      this.setCookies( res, accessToken, refreshToken );
      res.json( { id } );
    } catch ( error ) {
      next( error );
    }
  };

  async signUp( req, res, next ) {
    try {
      const { id, accessToken, refreshToken } = await this.authService.signUp( req.body );
      this.setCookies( res, accessToken, refreshToken );
      res.json( { id } );
    } catch ( error ) {
      next( error );
    }
  };

  async refreshToken( req, res, next ) {
    try {
      let { accessToken, refreshToken } = req.cookies;

      if ( !accessToken && !refreshToken ) {
        throw( new Unauthorized( [ { name: 'token', message: 'Token not provided' } ] ) );
      }

      if ( !accessToken && refreshToken ) {
        const tokens = await this.authService.refreshToken( refreshToken );
        this.setCookies( res, tokens.accessToken, tokens.refreshToken );
        accessToken = tokens.accessToken;
      }

      req.user = this.tokenService.verifyAccessToken( accessToken );
      next();
    } catch ( error ) {
      next( error );
    }
  };

};
