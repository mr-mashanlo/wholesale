import { BadRequest } from '../../errors/bad-request.js';
import { Unauthorized } from '../../errors/unauthorized.js';

export class AuthService {

  constructor( db, authRepository, userRepository, tokenService, passwordService ) {
    this.db = db;
    this.authRepository = authRepository;
    this.userRepository = userRepository;
    this.tokenService = tokenService;
    this.passwordService = passwordService;
  };

  generateTokens( payload ) {
    const accessToken = this.tokenService.generateAccessToken( payload );
    const refreshToken = this.tokenService.generateRefreshToken();
    const hashedRefreshToken = this.tokenService.hashRefreshToken( refreshToken );
    return { accessToken, refreshToken, hashedRefreshToken };
  };

  async signIn( { email, password } ) {
    return await this.db.transaction( async tx => {
      const auth = await this.authRepository.findOne( { email }, tx );
      if ( !auth ) throw new BadRequest( [ { name: 'email', message: 'Email is not exist' } ] );

      const isValid = this.passwordService.compare( password, auth.password );
      if ( !isValid ) throw new BadRequest( [ { name: 'password', message: 'Incorrect password' } ] );

      const user = await this.userRepository.findOne( { authId: auth.id }, tx );
      const { accessToken, refreshToken, hashedRefreshToken } = this.generateTokens( { id: auth.id, email: auth.email, role: user.role, userId: user.id } );
      await this.authRepository.update( { id: auth.id }, { refreshToken: hashedRefreshToken, expiredAt: Temporal.Now.instant().add( { hours: Number( process.env.JWT_REFRESH_TIME ) } ) }, tx );

      return { id: auth.id, email: auth.email, role: user.role, userId: user.id, accessToken, refreshToken };
    } );
  };

  async signUp( { name, email, password } ) {
    return await this.db.transaction( async tx => {
      const candidate = await this.authRepository.findOne( { email }, tx );
      if ( candidate ) throw new BadRequest( [ { name: 'email', message: 'Email is already exist' } ] );

      const hash = this.passwordService.hash( password );
      const auth = await this.authRepository.create( { email, password: hash }, tx );
      const user = await this.userRepository.create( { authId: auth.id, name }, tx );

      const { accessToken, refreshToken, hashedRefreshToken } = this.generateTokens( { id: auth.id, email: auth.email, role: user.role, userId: user.id } );
      await this.authRepository.update( { id: auth.id }, { refreshToken: hashedRefreshToken, expiredAt: Temporal.Now.instant().add( { hours: Number( process.env.JWT_REFRESH_TIME ) } ) }, tx );

      return { id: auth.id, email: auth.email, role: user.role, userId: user.id, accessToken, refreshToken };
    } );
  };

  async refreshToken( refreshToken ) {
    return await this.db.transaction( async tx => {
      const hashedRefreshToken = this.tokenService.hashRefreshToken( refreshToken );
      const auth = await this.authRepository.findOne( { refreshToken: hashedRefreshToken }, tx );

      if ( !auth ) throw new Unauthorized( [ { name: 'token', message: 'Invalid or reused token' } ] );
      if ( Temporal.Instant.compare( Temporal.Now.instant(), auth.expiredAt ) > 0 ) throw new Unauthorized( [ { name: 'token', message: 'Token has expired' } ] );

      const { accessToken: newAccessToken, refreshToken: newRefreshToken, hashedRefreshToken: newHashedRefreshToken } = this.generateTokens( { id: auth._id, nickname: auth.nickname }, tx );
      const updatedUser = await this.authRepository.update( { id: auth.id, refreshToken: hashedRefreshToken }, { refreshToken: newHashedRefreshToken, expiredAt: Temporal.Now.instant().add( { hours: Number( process.env.JWT_REFRESH_TIME ) } ) }, tx );

      if ( !updatedUser ) throw new Unauthorized( [ { message: 'Token already rotated' } ] );
      return { id: auth.id, email: auth.email, accessToken: newAccessToken, refreshToken: newRefreshToken };
    } );
  };

};
