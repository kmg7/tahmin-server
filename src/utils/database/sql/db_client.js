import { PrismaClient } from '@prisma/client';

let prisma = new PrismaClient({ errorFormat: 'minimal' });
export default prisma;
