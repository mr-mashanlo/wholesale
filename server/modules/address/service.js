export class AddressService {

  constructor( addressRepository ) {
    this.addressRepository = addressRepository;
  };

  createAddress = async body => {
    return await this.addressRepository.create( body );
  };

  deleteAddress = async query => {
    return await this.addressRepository.delete( query );
  };

  getAddresses = async ( { filter, sort, pagination } ) => {
    const data = await this.addressRepository.find( { filter, sort, pagination } );
    const total = await this.addressRepository.count( filter );
    return { data, ...total, ...pagination };
  };

  getAddress = async query => {
    return await this.addressRepository.findOne( query );
  };

  updateAddress = async ( query, address ) => {
    return await this.addressRepository.update( query, address );
  };

};
