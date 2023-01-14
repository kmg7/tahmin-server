//ORM error => https://www.prisma.io/docs/reference/api-reference/error-reference#common

const dbError = (err) => {
  return {
    code: err.code,
    where: err.meta,
    message: err.message,
  };
};
export default dbError;
