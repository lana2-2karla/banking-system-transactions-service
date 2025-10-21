import TTransactionUseCaseCreateInput from './input/TTransactionUseCaseCreateInput';
import ITransactionUseCaseGetAllByUserIdOutput 
  from './output/ITransactionUseCaseGetAllByUserIdOutput';
 
interface ITransactionUseCase {
  create(input: TTransactionUseCaseCreateInput): Promise<void>
  getAllByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<ITransactionUseCaseGetAllByUserIdOutput>
}

export default ITransactionUseCase;