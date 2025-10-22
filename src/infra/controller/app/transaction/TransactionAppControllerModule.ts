import { Module } from '@nestjs/common';
import TransactionUseCaseProxyModule 
  from '@infra/usecaseproxy/transaction/TransactionUseCaseProxyModule';
import TransactionAppController from './TransactionAppController';

@Module({
  imports: [TransactionUseCaseProxyModule],
  controllers: [TransactionAppController],
})

export default class TransactionAppControllerModule {}