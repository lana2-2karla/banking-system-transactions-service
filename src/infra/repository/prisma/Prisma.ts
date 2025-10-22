import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma as IPrisma } from 'prisma/generate';

@Injectable()
class Prisma extends PrismaClient {}

export { IPrisma };
export default Prisma;