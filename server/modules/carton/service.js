export class CartonService {

  constructor( cartonRepository ) {
    this.cartonRepository = cartonRepository;
  };

  createCarton = async body => {
    return await this.cartonRepository.create( body );
  };

  deleteCarton = async query => {
    return await this.cartonRepository.delete( query );
  };

  getCartons = async ( { filter, sort, pagination } ) => {
    const data = await this.cartonRepository.find( { filter, sort, pagination } );
    const total = await this.cartonRepository.count( filter );
    return { data, ...total, ...pagination };
  };

  getCarton = async query => {
    return await this.cartonRepository.findOne( query );
  };

  updateCarton = async ( query, body ) => {
    return await this.cartonRepository.update( query, body );
  };

};
