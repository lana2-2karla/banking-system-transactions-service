import TransactionUseCase from '@app/transaction/TransactionUseCase';
import UserUseCase from '@app/user/UserUseCase';
import TransactionRepository from '@infra/repository/transaction/TransactionRepository';
import DecimalAdapter from '@infra/adapter/decimal/DecimalAdapter';
import CreateUseProxyProvider from '../helper/CreateUseProxyProvider';

const TransactionUseCaseProxy = CreateUseProxyProvider(
  TransactionUseCase,
  [
    UserUseCase,
    TransactionRepository,
    DecimalAdapter,
  ],
);

export default TransactionUseCaseProxy;