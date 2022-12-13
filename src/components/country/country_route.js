const express = require('express');
const router = express.Router();
const {
  createCountry,
  createManyCountry,
  updateCountry,
  deleteCountry,
  deleteManyCountry,
  getCountry,
  getAllCountries,
  searchCountry,
} = require('./country_controller');

router.route('/country').get(getCountry).post(createCountry).put(updateCountry).delete(deleteCountry);
router.route('/country/many').get(getAllCountries).post(createManyCountry).delete(deleteManyCountry);
router.route('/country/search').get(searchCountry);

module.exports = router;
