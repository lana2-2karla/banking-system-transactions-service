import ITransaction from '@domain/entity/transaction/ITransaction';

type TTransactionUseCaseCreateInput = Omit<ITransaction, 'id' | 'createdAt' | 'status'>;

export default TTransactionUseCaseCreateInput;