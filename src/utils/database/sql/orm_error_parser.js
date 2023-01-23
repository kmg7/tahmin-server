import { Prisma } from '@prisma/client';

const expected = ['P2002', 'P2003', 'P2025'];

export const orm_error_handler = (err) => {
  let response = {
    layer: 'DATABASE',
    level: 'NOTEXPECTED',
    code: err.code,
    details: err,
  };

  if (expected.includes(err.code)) {
    response.level = 'EXPECTED';
    return response;
  }
  //TODO performance research
  if (err instanceof Prisma.PrismaClientInitializationError) {
    response.level = 'CRITICAL';
  } else if (err instanceof Prisma.PrismaClientRustPanicError) {
    response.level = 'CRITICAL';
  }
  return response;
};

//TODO noProduction
// if (err instanceof Prisma.PrismaClientValidationError) {
//   response.level = 'NOTEXPECTED';
// } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
//   response.level = 'NOTEXPECTED';
// } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
//   response.level = 'NOTEXPECTED';
// } else
