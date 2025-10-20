import { Module } from '@nestjs/common';
import { Routes } from '@nestjs/core';
import TransactionAppControllerModule from './transaction/TransactionAppControllerModule';

const appRoutes: Routes = [
  {
    path: 'transaction',
    module: TransactionAppControllerModule,
  },
];

@Module({
  imports: [
    TransactionAppControllerModule,
  ],
})
class AppControllerModule {}

export { appRoutes };
export default AppControllerModule;