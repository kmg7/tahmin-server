import { PrismaClient } from '@prisma/client';

let prisma = new PrismaClient({ errorFormat: 'minimal' });
prisma.country.findUnique({
    where: { code: 'TUR' },
    select: {
    teams: {}
}})

export default prisma;
