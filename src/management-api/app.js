import express from 'express';
import rateLimiter from 'express-rate-limit';
import routes from './routes.js';
import notFoundMiddleware from './middleware/not_found.js';
import { validateContentType } from './middleware/request_validate.js';

const main = '/v1';
const app = express();
const mainLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 60,
});

//middleware
app.use(mainLimiter);
app.use(express.json());
app.use(validateContentType);

//route
app.use(main, routes);

app.get(main, (req, res) => {
  res.send('Tahmin Management API v1');
});

app.use(notFoundMiddleware);

export default app;
