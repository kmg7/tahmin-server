const { PrismaClient } = require('@prisma/client');

let prisma = new PrismaClient({ errorFormat: 'minimal' });
module.exports = prisma;
