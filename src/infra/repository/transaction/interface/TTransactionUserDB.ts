import { IPrisma } from '@infra/repository/prisma/Prisma';

type TTransactionUserDB = IPrisma.TransactionGetPayload<{
  include: {
    sender: true;
    receiver: true;
  };
}>;

export default TTransactionUserDB;