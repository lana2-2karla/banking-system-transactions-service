import TTransactionUserDB from './TTransactionUserDB';

type TTransactionUserDBStrict = TTransactionUserDB & {
  sender: NonNullable<TTransactionUserDB['sender']>;
  receiver: NonNullable<TTransactionUserDB['receiver']>;
};

export default TTransactionUserDBStrict;