import IUser from '@domain/entity/user/IUser';

interface IUserRepository {
  getById(id: string): Promise<IUser | null>
}

export default IUserRepository;