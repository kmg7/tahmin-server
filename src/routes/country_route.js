import express from 'express';
const router = express.Router();

import {
  createCountry,
  createManyCountry,
  updateCountry,
  deleteCountry,
  deleteManyCountry,
  getCountry,
  getAllCountries,
  searchCountry,
} from '../controller/country_controller';

router.route('/country').get(getCountry).post(createCountry).put(updateCountry).delete(deleteCountry);
router.route('/country/many').get(getAllCountries).post(createManyCountry).delete(deleteManyCountry);
router.route('/country/search').get(searchCountry);

export default router;
