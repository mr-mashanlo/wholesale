import { BadRequest } from '../../errors/bad-request.js';
import { Unauthorized } from '../../errors/unauthorized.js';

export class AuthService {

  constructor( authRepository, authUnitOfWork, tokenService, passwordService ) {
    this.authRepository = authRepository;
    this.authUnitOfWork = authUnitOfWork;
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
    return await this.authUnitOfWork.transaction( async repository => {
      const auth = await repository.auth.findOne( { email } );
      if ( !auth ) throw new BadRequest( [ { name: 'email', message: 'Email is not exist' } ] );

      const isValid = this.passwordService.compare( password, auth.password );
      if ( !isValid ) throw new BadRequest( [ { name: 'password', message: 'Incorrect password' } ] );

      const user = await repository.user.findOne( { authId: auth.id } );
      const { accessToken, refreshToken, hashedRefreshToken } = this.generateTokens( { id: auth.id, email: auth.email, role: user.role, userId: user.id } );
      await repository.auth.update( { id: auth.id }, { refreshToken: hashedRefreshToken, expiredAt: Temporal.Now.instant().add( { hours: Number( process.env.JWT_REFRESH_TIME ) } ) } );

      return { id: auth.id, email: auth.email, role: user.role, userId: user.id, accessToken, refreshToken };
    } );
  };

  async signUp( { name, email, password } ) {
    return await this.authUnitOfWork.transaction( async repository => {
      const candidate = await repository.auth.findOne( { email } );
      if ( candidate ) throw new BadRequest( [ { name: 'email', message: 'Email is already exist' } ] );

      const hash = this.passwordService.hash( password );
      const auth = await repository.auth.create( { email, password: hash } );
      const user = await repository.user.create( { authId: auth.id, name } );

      const { accessToken, refreshToken, hashedRefreshToken } = this.generateTokens( { id: auth.id, email: auth.email, role: user.role, userId: user.id } );
      await repository.auth.update( { id: auth.id }, { refreshToken: hashedRefreshToken, expiredAt: Temporal.Now.instant().add( { hours: Number( process.env.JWT_REFRESH_TIME ) } ) } );

      return { id: auth.id, email: auth.email, role: user.role, userId: user.id, accessToken, refreshToken };
    } );
  };

  async refreshToken( refreshToken ) {
    return await this.authUnitOfWork.transaction( async repository => {
      const hashedRefreshToken = this.tokenService.hashRefreshToken( refreshToken );
      const auth = await repository.auth.findOne( { refreshToken: hashedRefreshToken } );

      if ( !auth ) throw new Unauthorized( [ { name: 'token', message: 'Invalid or reused token' } ] );
      if ( Temporal.Instant.compare( Temporal.Now.instant(), auth.expiredAt ) > 0 ) throw new Unauthorized( [ { name: 'token', message: 'Token has expired' } ] );

      const user = await repository.user.findOne( { authId: auth.id } );
      const { accessToken: newAccessToken, refreshToken: newRefreshToken, hashedRefreshToken: newHashedRefreshToken } = this.generateTokens( { id: auth.id, email: auth.email, role: user.role, userId: user.id } );
      const updatedUser = await repository.auth.update( { id: auth.id, refreshToken: hashedRefreshToken }, { refreshToken: newHashedRefreshToken, expiredAt: Temporal.Now.instant().add( { hours: Number( process.env.JWT_REFRESH_TIME ) } ) } );

      if ( !updatedUser ) throw new Unauthorized( [ { message: 'Token already rotated' } ] );
      return { id: auth.id, email: auth.email, accessToken: newAccessToken, refreshToken: newRefreshToken };
    } );
  };

};
