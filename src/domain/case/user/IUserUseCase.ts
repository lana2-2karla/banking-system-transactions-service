import IUser from '@domain/entity/user/IUser';

interface IUserUseCase {
  getById(id: string): Promise<IUser | null>
}

export default IUserUseCase;