import IDecimalAdapter from '@domain/adapter/decimal/IDecimalAdapter';
import TTransactionUseCaseCreateInput 
  from '@domain/case/transaction/input/TTransactionUseCaseCreateInput';
import ITransactionUseCase from '@domain/case/transaction/ITransactionUseCase';
import TTransactionUseCaseGetByUserIdOutput 
  from '@domain/case/transaction/output/TTransactionUseCaseGetByUserIdOutput';
import IUserUseCase from '@domain/case/user/IUserUseCase';
import ITransactionWithUsers from '@domain/entity/transaction/ITransactionWithUsers';
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

  async getAllByUserId(userId: string): Promise<TTransactionUseCaseGetByUserIdOutput[]> {
    const transactions = await this._transactionRepository.getAllByUserId(userId);
    return transactions.map((transaction) => this._formatTransactionsForUser(transaction));
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

  private _formatTransactionsForUser(
    transaction: ITransactionWithUsers,
  ): TTransactionUseCaseGetByUserIdOutput {
    return {
      id: transaction.id,
      amount: transaction.amount,
      status: transaction.status,
      createdAt: transaction.createdAt,
      sender: {
        id: transaction.sender.id,
        name: transaction.sender.name,
      },
      receiver: {
        id: transaction.receiver.id,
        name: transaction.receiver.name,
      },
    };
  }
}

export default TransactionUseCase;