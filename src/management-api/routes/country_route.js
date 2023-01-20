import { Router } from 'express';
const router = Router();

import {
  createCountry,
  createManyCountry,
  updateCountry,
  deleteCountry,
  deleteManyCountry,
  getCountry,
  getAllCountries,
  getCountryProperty,
  searchCountry,
  upsertCountry,
} from '../controller/country_controller.js';

router.route('/').get(getCountry).post(createCountry).put(updateCountry).delete(deleteCountry);
router.route('/many').get(getAllCountries).post(createManyCountry).put(upsertCountry).delete(deleteManyCountry);
router.route('/:id/:prop').get(getCountryProperty);
router.route('/search').get(searchCountry);

export default router;
