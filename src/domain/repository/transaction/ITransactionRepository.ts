import ITransaction from '@domain/entity/transaction/ITransaction';
import ITransactionWithUsers from '@domain/entity/transaction/ITransactionWithUsers';
import TTransactionRepositoryCreateInput from './input/TTransactionRepositoryCreateInput';

interface ITransactionRepository {
  createAtomic(input: TTransactionRepositoryCreateInput): Promise<ITransaction | null>
  getAllByUserId(userId: string): Promise<ITransactionWithUsers[]>
}
export default ITransactionRepository;