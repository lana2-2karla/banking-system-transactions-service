import ITransaction from './ITransaction';
import IUser from '../user/IUser';

interface ITransactionWithUsers extends ITransaction {
  sender: IUser;
  receiver: IUser;
}

export default ITransactionWithUsers;
