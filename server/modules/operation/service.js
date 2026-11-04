export class OperationService {

  constructor( operationRepository, operationUnitToWork ) {
    this.operationRepository = operationRepository;
    this.operationUnitToWork = operationUnitToWork;
  };

  createOperation = async ( { type, status, products } ) => {
    return await this.operationUnitToWork.transaction( async repository => {
      const operation = await repository.operation.create( { type, status } );
      const transactionEntities = products.reduce( ( acc, item ) => [ ...acc, { ...item, operationId: operation.id, amount: type === 'INBOUND' || type === 'RETURN' ? +item.amount : -item.amount } ], [] );
      await repository.transaction.create( transactionEntities );
      return operation;
    } );
  };

  getOperations = async ( { filter, sort, pagination } ) => {
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
