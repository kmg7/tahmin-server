//ORM errorreference => https://www.prisma.io/docs/reference/api-reference/error-reference#common

import { Prisma } from '@prisma/client';

export const orm_error_handler = (err) => {
  if (err instanceof Prisma.PrismaClientValidationError) {
    console.log('*******PrismaClientValidationError********');
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    console.log('*******PrismaClientKnownRequestError********');
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    console.log('*******PrismaClientUnknownRequestError********');
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    console.log('*******PrismaClientInitializationError********');
  } else if (err instanceof Prisma.PrismaClientRustPanicError) {
    console.log('*******PrismaClientRustPanicError********');
  }
  if (err.code) {
    if (err.code.startsWith('P1')) {
      return {
        success: false,
        statusCode: 500,
        error: { code: err.code, message: err.message, details: err.meta },
      };
    }

    if (err.code.startsWith('P2')) {
      return {
        success: false,
        statusCode: 400,
        error: { code: err.code, message: err.message, details: err.meta },
      };
    }
  }

  return {
    success: false,
    statusCode: 500,
    error: { code: err.code, message: err.message, details: err.meta },
  };
};
