import ITransaction from '@domain/entity/transaction/ITransaction';
import TTransactionRepositoryCreateInput 
  from '@domain/repository/transaction/input/TTransactionRepositoryCreateInput';
import ITransactionRepository from '@domain/repository/transaction/ITransactionRepository';
import ETransactionStatus from '@domain/entity/transaction/ETransactionStatus';
import { Injectable } from '@nestjs/common';
import TransactionException from '@domain/exception/transaction/TransactionException';
import TTransactionRepositoryGetAllByUserIdOutput 
  from '@domain/repository/transaction/output/TTransactionRepositoryGetAllByUserIdOutput';
import Prisma, { IPrisma } from '../prisma/Prisma';
import TransactionDBO from './dbo/TransactionDBO';
import TTransactionDB from './interface/TTransactionDB';
import TransactionWithUsersDBO from './dbo/TransactionWithUsersDBO';
import TTransactionUserDBStrict from './interface/TTransactionUserDBStrict';
import TTransactionUserDB from './interface/TTransactionUserDB';
import TTransactionRepositoryGetAllByUserIdFilter 
  from './interface/TTransactionRepositoryGetAllByUserIdFilter';
import IPrismaPagination from './interface/IPrismaPagination';
import TTransactionFetchGetAllByUserIdResult 
  from './interface/TTransactionFetchGetAllByUserIdResult';

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

  async getAllByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<TTransactionRepositoryGetAllByUserIdOutput> {
    try {
      const pagination = this._getPagination(page, limit);
      const whereClause = this._getTransactionUserFilter(userId);

      const [transactions, total] = await this._fetchTransactionsAndCount(whereClause, pagination);

      const validTransactions = this._filterValidTransactions(transactions);

      return {
        transactions: validTransactions.map(
          (transaction) => new TransactionWithUsersDBO(transaction),
        ),
        total,
      };
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
    transactions: TTransactionUserDB[],
  ): TTransactionUserDBStrict[] {
    return transactions.filter(this._hasValidRelations);
  }

  private _hasValidRelations(
    transaction: TTransactionUserDB,
  ): transaction is TTransactionUserDBStrict {
    const valid = Boolean(transaction.sender && transaction.receiver);
    if (!valid) {
      console.warn(`Transação ${transaction.id} está sem remetente ou destinatário.`);
    }
    return valid;
  }

  private _getTransactionUserFilter(userId: string): TTransactionRepositoryGetAllByUserIdFilter {
    return {
      OR: [{ senderId: userId }, { receiverId: userId }],
    };
  }

  private _getPagination(page: number, limit: number): IPrismaPagination {
    return {
      skip: (page - 1) * limit,
      take: limit,
    };
  }

  private async _fetchTransactionsAndCount(
    where: object,
    pagination: IPrismaPagination,
  ): TTransactionFetchGetAllByUserIdResult {
    return this._prisma.$transaction([
      this._prisma.transaction.findMany({
        where,
        include: { sender: true, receiver: true },
        orderBy: { createdAt: 'desc' },
        ...pagination,
      }),
      this._prisma.transaction.count({ where }),
    ]);
  }
}

export default TransactionRepository;
