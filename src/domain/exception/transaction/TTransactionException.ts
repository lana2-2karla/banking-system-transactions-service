type TTransactionException =
  | 'sameUserError'
  | 'invalidAmountError'
  | 'senderNotFound'
  | 'receiverNotFound'
  | 'insufficientBalance'
  | 'unexpectedError';

export default TTransactionException;