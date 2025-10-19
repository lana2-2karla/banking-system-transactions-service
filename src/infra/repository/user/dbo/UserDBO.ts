import { User as UserDB } from '@prisma/client'; 

class UserDBO {
  id: string;
  name: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(input: UserDB) {
    this.id = input.id;
    this.name = input.name;
    this.balance = Number(input.balance);
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
  }
}

export default UserDBO;