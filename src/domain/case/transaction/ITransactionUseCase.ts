import TTransactionUseCaseCreateInput from './input/TTransactionUseCaseCreateInput';

interface ITransactionUseCase {
  create(input: TTransactionUseCaseCreateInput): Promise<void>
}

export default ITransactionUseCase;