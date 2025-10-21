import ITransactionWithUsers from '@domain/entity/transaction/ITransactionWithUsers';

type TTransactionRepositoryGetAllByUserIdOutput = {
  transactions: ITransactionWithUsers[];
  total: number;
};

export default TTransactionRepositoryGetAllByUserIdOutput;