import ETransactionStatus from './ETransactionStatus';

interface ITransaction {
  id: string;
  senderId: string; 
  receiverId: string
  amount: number;
  status: ETransactionStatus;
  createdAt: Date;
}

export default ITransaction;