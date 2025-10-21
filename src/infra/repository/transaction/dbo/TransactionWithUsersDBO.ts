import ETransactionStatus from '@domain/entity/transaction/ETransactionStatus';
import ITransactionWithUsers from '@domain/entity/transaction/ITransactionWithUsers';
import TTransactionUserDBStrict from '../interface/TTransactionUserDBStrict';

class TransactionWithUsersDBO implements ITransactionWithUsers {
  id: string;
  senderId: string;
  receiverId: string;
  amount: string;
  status: ETransactionStatus;
  createdAt: Date;
  sender: { id: string; name: string; balance: string };
  receiver: { id: string; name: string; balance: string };

  constructor(input: TTransactionUserDBStrict) {
    this.id = input.id;
    this.senderId = input.senderId;
    this.receiverId = input.receiverId;
    this.amount = input.amount.toString();
    this.status = input.status as unknown as ETransactionStatus;
    this.createdAt = input.createdAt;
    this.sender = {
      id: input.sender.id,
      name: input.sender.name,
      balance: input.sender.balance.toString(),
    };
    this.receiver = {
      id: input.receiver.id,
      name: input.receiver.name,
      balance: input.receiver.balance.toString(),
    };
  }
}

export default TransactionWithUsersDBO;
