const xss = require('xss-clean');
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');

const mainLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 60,
});
const predictionLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 30,
});
const authLimiter = rateLimiter({
  windowMs: 60 * 60 * 1000,
  max: 5,
});

module.exports = {
  xss,
  helmet,
  mainLimiter,
};
