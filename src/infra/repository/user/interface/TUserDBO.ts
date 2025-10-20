import { IPrisma } from '@infra/repository/prisma/Prisma';

type TUserDB = IPrisma.UserGetPayload<object>;

export default TUserDB;