import { IPrisma } from '@infra/repository/prisma/Prisma';

type TTransactionDB = IPrisma.TransactionGetPayload<object>;

export default TTransactionDB;