export class UserService {

  constructor( userRepository ) {
    this.userRepository = userRepository;
  };

  createUser = async body => {
    return await this.userRepository.create( body );
  };

  getUsers = async ( { filter, sort, pagination } ) => {
    const data = await this.userRepository.find( { filter, sort, pagination } );
    const total = await this.userRepository.count( filter );
    return { data, ...total, ...pagination };
  };

  getUser = async query => {
    return await this.userRepository.findOne( query );
  };

  updateUser = async ( query, body ) => {
    return await this.userRepository.update( query, body );
  };

};
