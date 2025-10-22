import ETransactionStatus from './ETransactionStatus';

interface ITransaction {
  id: string;
  senderId: string; 
  receiverId: string
  amount: string;
  status: ETransactionStatus;
  createdAt: Date;
}

export default ITransaction;