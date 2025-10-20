import { Module } from '@nestjs/common';
import RepositoryModule from '@infra/repository/RepositoryModule';
import TransactionUseCaseProxy from './TransactionUseCaseProxy';
import UserUseCaseProxyModule from '../user/UserUseCaseProxyModule';

@Module({
  imports: [
    UserUseCaseProxyModule,
    RepositoryModule,
  ],
  providers: [TransactionUseCaseProxy],
  exports: [TransactionUseCaseProxy],
})
class TransactionUseCaseProxyModule {}

export default TransactionUseCaseProxyModule;