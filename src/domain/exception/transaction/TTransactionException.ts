type TTransactionException =
  | 'sameUserError'
  | 'invalidAmountError'
  | 'senderNotFound'
  | 'receiverNotFound'
  | 'insufficientBalance';

export default TTransactionException;