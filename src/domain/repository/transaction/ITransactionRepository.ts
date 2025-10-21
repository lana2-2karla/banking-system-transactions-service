import ITransaction from '@domain/entity/transaction/ITransaction';
import TTransactionRepositoryCreateInput from './input/TTransactionRepositoryCreateInput';
import TTransactionRepositoryGetAllByUserIdOutput 
  from './output/TTransactionRepositoryGetAllByUserIdOutput';

interface ITransactionRepository {
  createAtomic(input: TTransactionRepositoryCreateInput): Promise<ITransaction | null>
  getAllByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<TTransactionRepositoryGetAllByUserIdOutput>
}
export default ITransactionRepository;