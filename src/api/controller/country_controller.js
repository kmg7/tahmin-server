import { ORMManager, Models } from '../../utils/database/sql/index.js';
import { ServiceManager } from '../../utils/service/service_manager.js';
import { ControllerManager } from '../../utils/controller/controller_manager.js';
import * as validationSchemas from '../../utils/object_schemas/country_schemas.js';

const manager = new ControllerManager({
  service: new ServiceManager({
    ormManager: new ORMManager({ model: Models.COUNTRY }),
    validationSchemas: validationSchemas,
  }),
});

const getCountry = async (req, res) => {
  await manager.get(req, res, fields);
};

const getCountryProperty = async (req, res) => {
  await manager.getProperty(req, res, { teams: teamFields, tournaments: tournamentFields });
};

const getAllCountries = async (req, res) => {
  await manager.getMany(req, res, fields);
};

const searchCountry = async (req, res) => {
  await manager.getMany(req, res, fields, true);
};

const fields = {
  id: true,
  code: true,
  name: true,
  logoUrl: true,
};

const tournamentFields = {
  id: true,
  countryCode: true,
  active: true,
  name: true,
  code: true,
  logoUrl: true,
  createdAt: true,
  updatedAt: true,
  stages: false,
  standings: false,
  country: false,
};

const teamFields = {
  id: true,
  code: true,
  name: true,
  logoUrl: true,
  countryCode: true,
  country: false,
  homeMatches: false,
  awayMatches: false,
};

export { getCountry, getAllCountries, getCountryProperty, searchCountry };
