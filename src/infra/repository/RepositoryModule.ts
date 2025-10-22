import { Module } from '@nestjs/common';
import Prisma from './prisma/Prisma';
import TransactionRepository from './transaction/TransactionRepository';
import UserRepository from './user/UserRepository';

@Module({
  imports: [],
  providers: [
    Prisma,
    TransactionRepository,
    UserRepository,
  ],
  exports: [
    TransactionRepository,
    UserRepository,
  ],
})

class RepositoryModule {}

export default RepositoryModule;