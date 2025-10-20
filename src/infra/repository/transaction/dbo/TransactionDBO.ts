import ITransaction from '@domain/entity/transaction/ITransaction';
import ETransactionStatus from '@domain/entity/transaction/ETransactionStatus';
import { Transaction as TransactionDB } from '@prisma/client';

class TransactionDBO implements ITransaction {
  id: string;
  senderId: string;
  receiverId: string;
  amount: string;
  status: ETransactionStatus;
  createdAt: Date;

  constructor(input: TransactionDB) {
    this.id = input.id;
    this.senderId = input.senderId;
    this.receiverId = input.receiverId;
    this.amount = input.amount.toFixed();
    this.status = input.status as unknown as ETransactionStatus;
    this.createdAt = input.createdAt;
  }
}

export default TransactionDBO;
