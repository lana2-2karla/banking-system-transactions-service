import TTransactionUseCaseCreateInput from './input/TTransactionUseCaseCreateInput';
import TTransactionUseCaseGetByUserIdOutput from './output/TTransactionUseCaseGetByUserIdOutput';
 
interface ITransactionUseCase {
  create(input: TTransactionUseCaseCreateInput): Promise<void>
  getAllByUserId(userId: string): Promise<TTransactionUseCaseGetByUserIdOutput[]>
}

export default ITransactionUseCase;