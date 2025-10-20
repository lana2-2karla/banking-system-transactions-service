import IDecimalAdapter from '@domain/adapter/decimal/IDecimalAdapter';
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
    private readonly _decimalAdapter: IDecimalAdapter,
  ) {}

  async create(input: TTransactionUseCaseCreateInput): Promise<void> {
    this._validateInput(input);

    const sender = await this._getUserOrThrow(input.senderId, 'sender');
    await this._getUserOrThrow(input.receiverId, 'receiver');

    this._validateBalance(sender.balance, input.amount);

    await this._transactionRepository.createAtomic({
      senderId: input.senderId,
      receiverId: input.receiverId,
      amount: input.amount,
    });
  }

  private _validateInput(input: TTransactionUseCaseCreateInput): void {
    const { senderId, receiverId, amount } = input;

    if (senderId === receiverId) throw new TransactionException('sameUserError');

    const value = Number(amount);
    const isInvalid = !Number.isFinite(value) || value <= 0;
    if (isInvalid) throw new TransactionException('invalidAmountError');
  }

  private _validateBalance(balance: string, amount: string) {
    if (this._decimalAdapter.isLessThan(balance, amount)) {
      throw new TransactionException('insufficientBalance');
    }
  }

  private async _getUserOrThrow(id: string, role: 'sender' | 'receiver'): Promise<IUser> {
    const user = await this._userUseCase.getById(id);
    if (!user) throw new TransactionException(`${role}NotFound`);
    return user;
  }
}

export default TransactionUseCase;