import IUserUseCase from '@domain/case/user/IUserUseCase';
import IUser from '@domain/entity/user/IUser';
import UserRepository from '@infra/repository/user/UserRepository';

class UserUseCase implements IUserUseCase {
  constructor(
    private readonly _userRepository: UserRepository,
  ) {}
  async getById(id: string): Promise<IUser | null> {
    const user = await this._userRepository.getById(id);
    return user;
  }
}

export default UserUseCase;