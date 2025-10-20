import TransactionUseCase from '@app/transaction/TransactionUseCase';
import UserUseCase from '@app/user/UserUseCase';
import TransactionRepository from '@infra/repository/transaction/TransactionRepository';
import CreateUseProxyProvider from '../helper/CreateUseProxyProvider';

const TransactionUseCaseProxy = CreateUseProxyProvider(
  TransactionUseCase,
  [
    UserUseCase,
    TransactionRepository,
  ],
);

export default TransactionUseCaseProxy;