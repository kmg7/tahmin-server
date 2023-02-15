import { Router } from 'express';
const router = Router();

import { getCountry, getAllCountries, getCountryProperty, searchCountry } from '../controller/country_controller.js';

router.route('/').get(getCountry);
router.route('/many').get(getAllCountries);
router.route('/:id/:prop').get(getCountryProperty);
router.route('/search').get(searchCountry);

export default router;
