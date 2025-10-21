import ITransaction from '@domain/entity/transaction/ITransaction';
import TTransactionRepositoryCreateInput 
  from '@domain/repository/transaction/input/TTransactionRepositoryCreateInput';
import ITransactionRepository from '@domain/repository/transaction/ITransactionRepository';
import ETransactionStatus from '@domain/entity/transaction/ETransactionStatus';
import { Injectable } from '@nestjs/common';
import ITransactionWithUsers from '@domain/entity/transaction/ITransactionWithUsers';
import TransactionException from '@domain/exception/transaction/TransactionException';
import Prisma, { IPrisma } from '../prisma/Prisma';
import TransactionDBO from './dbo/TransactionDBO';
import TTransactionDB from './interface/TTransactionDB';
import TransactionWithUsersDBO from './dbo/TransactionWithUsersDBO';
import TTansactionUserDBStrict from './interface/TTansactionUserDBStrict';
import TTansactionUserDB from './interface/TTansactionUserDB';

@Injectable()
class TransactionRepository implements ITransactionRepository {
  constructor(private readonly _prisma: Prisma) {}

  async createAtomic(input: TTransactionRepositoryCreateInput): Promise<ITransaction> {
    const { senderId, receiverId, amount } = input;
    try {
      const transaction = await this._prisma.$transaction(async (prisma) => {
        await this._updateBalance(prisma, senderId, `-${amount}`);
        await this._updateBalance(prisma, receiverId, amount);

        return this._createTransaction(prisma, input, ETransactionStatus.FINALIZED);
      });
      return new TransactionDBO(transaction);
    } catch (error) {
      await this._createTransaction(this._prisma, input, ETransactionStatus.FAILED);
      throw error;
    }
  }

  async getAllByUserId(userId: string): Promise<ITransactionWithUsers[]> {
    try {
      const transactions = await this._prisma.transaction.findMany({
        where: { OR: [{ senderId: userId }, { receiverId: userId }] },
        include: { sender: true, receiver: true },
        orderBy: { createdAt: 'desc' },
      });

      const validTransactions = this._filterValidTransactions(transactions);

      return validTransactions.map((transaction) => new TransactionWithUsersDBO(transaction));
    } catch (error) {
      throw new TransactionException('unexpectedError');
    }
  }

  private async _updateBalance(
    prisma: IPrisma.TransactionClient,
    userId: string,
    delta: string,
  ): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { balance: { increment: delta } },
    });
  }

  private async _createTransaction(
    prisma: IPrisma.TransactionClient,
    input: TTransactionRepositoryCreateInput,
    status: ETransactionStatus,
  ): Promise<TTransactionDB> {
    return prisma.transaction.create({
      data: { ...input, status },
    });
  }

  private _filterValidTransactions(
    transactions: TTansactionUserDB[],
  ): TTansactionUserDBStrict[] {
    return transactions.filter(this._hasValidRelations);
  }

  private _hasValidRelations(
    transaction: TTansactionUserDB,
  ): transaction is TTansactionUserDBStrict {
    const valid = Boolean(transaction.sender && transaction.receiver);
    if (!valid) {
      console.warn(`Transação ${transaction.id} está sem remetente ou destinatário.`);
    }
    return valid;
  }
}

export default TransactionRepository;
