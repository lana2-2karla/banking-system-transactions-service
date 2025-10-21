import ITransaction from '@domain/entity/transaction/ITransaction';
import IUser from '@domain/entity/user/IUser';

type TUserSummary = Pick<IUser, 'id' | 'name'>;

type ITransactionUseCaseFormatByUserIdOutput = {
  id: ITransaction['id'];
  amount: ITransaction['amount'];
  status: ITransaction['status'];
  createdAt: ITransaction['createdAt'];
  sender: TUserSummary;
  receiver: TUserSummary;
};

export default ITransactionUseCaseFormatByUserIdOutput;
