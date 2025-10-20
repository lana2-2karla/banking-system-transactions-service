import { Module } from '@nestjs/common';
import RepositoryModule from '@infra/repository/RepositoryModule';
import UserUseCaseProxy from './UserUseCaseProxy';

@Module({
  imports: [RepositoryModule],
  providers: [UserUseCaseProxy],
  exports: [UserUseCaseProxy],
})
class UserUseCaseProxyModule {}

export default UserUseCaseProxyModule;