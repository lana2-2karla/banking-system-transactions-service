import ITransaction from '@domain/entity/transaction/ITransaction';
import TTransactionRepositoryCreateInput from './input/TTransactionRepositoryCreateInput';

interface ITransactionRepository {
  createAtomic(input: TTransactionRepositoryCreateInput): Promise<ITransaction | null>
}
export default ITransactionRepository;