import TTransactionException from './TTransactionException';

class TransactionException extends Error {
  message: TTransactionException;
  constructor(error: TTransactionException) {
    super(error);
    this.message = error;
  }
}

export default TransactionException;