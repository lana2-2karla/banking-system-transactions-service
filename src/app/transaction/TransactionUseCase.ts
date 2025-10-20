import TTransactionUseCaseCreateInput 
  from '@domain/case/transaction/input/TTransactionUseCaseCreateInput';
import ITransactionUseCase from '@domain/case/transaction/ITransactionUseCase';
import IUserUseCase from '@domain/case/user/IUserUseCase';
import IUser from '@domain/entity/user/IUser';
import TransactionException from '@domain/exception/transaction/TransactionException';
import ITransactionRepository from '@domain/repository/transaction/ITransactionRepository';

class TransactionUseCase implements ITransactionUseCase {
  constructor(
    private readonly _userUseCase: IUserUseCase,
    private readonly _transactionRepository: ITransactionRepository,
  ) {}

  async create(input: TTransactionUseCaseCreateInput): Promise<void> {
    const { senderId, receiverId, amount } = input;
    
    if (senderId === receiverId) throw new TransactionException('sameUserError');
    
    const value = Number(amount);
    const isInvalidAmount = !Number.isFinite(value) || value <= 0;
    if (isInvalidAmount) throw new TransactionException('invalidAmountError');

    const userSender = await this._getUserOrThrow(senderId, 'sender');
    await this._getUserOrThrow(receiverId, 'receiver');

    if (userSender.balance < amount) throw new TransactionException('insufficientBalance');

    await this._transactionRepository.createAtomic({ 
      senderId,
      receiverId,
      amount,
    });
  }

  private async _getUserOrThrow(id: string, role: 'sender' | 'receiver'): Promise<IUser> {
    const user = await this._userUseCase.getById(id);
    if (!user) throw new TransactionException(`${role}NotFound`);
    return user;
  }
}

export default TransactionUseCase;