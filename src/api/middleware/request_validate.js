export const validateContentType = (req, res, next) => {
  if (!(req.method == 'GET' || req.method == 'DELETE')) {
    if (!isApplicationJson(req)) {
      res.status(415).json({
        message: 'Content-Type must be application/json',
      });
      return;
    }
  }
  next();
};

function isApplicationJson(req) {
  if (req.headers['content-type'] === 'application/json') {
    return true;
  }
}
