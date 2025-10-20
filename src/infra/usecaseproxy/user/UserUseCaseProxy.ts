import UserUseCase from '@app/user/UserUseCase';
import UserRepository from '@infra/repository/user/UserRepository';
import CreateUseProxyProvider from '../helper/CreateUseProxyProvider';

const UserUseCaseProxy = CreateUseProxyProvider(
  UserUseCase,
  [UserRepository],
);

export default UserUseCaseProxy;