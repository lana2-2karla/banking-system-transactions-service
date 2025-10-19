import ITransaction from '@domain/entity/transaction/ITransaction';

type TTransactionRepositoryCreateInput = Omit<ITransaction, 'id' | 'createdAt' | 'status'>;

export default TTransactionRepositoryCreateInput;