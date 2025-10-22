import IUser from '@domain/entity/user/IUser';
import TUserDB from '../interface/TUserDBO';

class UserDBO implements IUser {
  id: string;
  name: string;
  balance: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(input: TUserDB) {
    this.id = input.id;
    this.name = input.name;
    this.balance = input.balance.toFixed();
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
  }
}

export default UserDBO;