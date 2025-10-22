import { Module } from '@nestjs/common';
import RepositoryModule from '@infra/repository/RepositoryModule';
import DecimalAdapterModule from '@infra/adapter/decimal/DecimalAdapterModule';
import TransactionUseCaseProxy from './TransactionUseCaseProxy';
import UserUseCaseProxyModule from '../user/UserUseCaseProxyModule';

@Module({
  imports: [
    UserUseCaseProxyModule,
    RepositoryModule,
    DecimalAdapterModule,
  ],
  providers: [TransactionUseCaseProxy],
  exports: [TransactionUseCaseProxy],
})
class TransactionUseCaseProxyModule {}

export default TransactionUseCaseProxyModule;