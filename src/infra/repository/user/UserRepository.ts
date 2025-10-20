import IUser from '@domain/entity/user/IUser';
import { Injectable } from '@nestjs/common';
import IUserRepository from '@domain/repository/user/IUserRepository';
import Prisma from '../prisma/Prisma';
import UserDBO from './dbo/UserDBO';

@Injectable()
class UserRepository implements IUserRepository {
  constructor(
    private readonly _prisma: Prisma,
  ) {}

  async getById(id: string): Promise<IUser | null> {
    const user = await this._prisma.user.findUnique({
      where: { id },
    });
    if (!user) return null;
    return new UserDBO(user);
  }
}

export default UserRepository;