import { FilteringSchema, PaginationSchema, SortingSchema } from './schema.js';

export class OperationService {

  constructor( operationRepository ) {
    this.operationRepository = operationRepository;
  };

  createOperation = async body => {
    return await this.operationRepository.create( body );
  };

  getOperations = async query => {
    const filter = FilteringSchema.parse( query );
    const sort = SortingSchema.parse( query );
    const pagination = PaginationSchema.parse( query );
    const data = await this.operationRepository.find( { filter, sort, pagination } );
    const total = await this.operationRepository.count( filter );
    return { data, ...total, ...pagination };
  };

  getOperation = async query => {
    return await this.operationRepository.findOne( query );
  };

  updateOperation = async ( query, body ) => {
    return await this.operationRepository.update( query, body );
  };

};
