import { validate } from '../validator.js';
import { handleError, convertToArray } from './service_utils.js';
import err_lib from '../../management-api/errors/error_library.js';
import { pagination as paginationSchema } from '../object_schemas/common_schemas.js';

export class ServiceManager {
  ormManager;
  validationSchemas;

  constructor({ ormManager, validationSchemas }) {
    this.ormManager = ormManager;
    this.validationSchemas = validationSchemas;
  }

  async create({ data, select }) {
    try {
      await validate({ obj: data, sch: this.validationSchemas.Create });
      const response = await this.ormManager.create({
        select: select,
        data: data,
      });
      return response;
    } catch (error) {
      return handleError({ error: error, errorLib: err_lib });
    }
  }

  async createMany({ data, select }) {
    try {
      await validate({ obj: data, sch: this.validationSchemas.CreateMany });
      const response = await this.ormManager.createMany({
        data: data,
        select: select,
      });
      return response;
    } catch (error) {
      return handleError({ error: error, errorLib: err_lib });
    }
  }

  async get({ where, select }) {
    try {
      await validate({ obj: where, sch: this.validationSchemas.Find });
      const response = await this.ormManager.get({
        where: { [where.field]: where.value },
        select: select,
      });
      return response;
    } catch (error) {
      return handleError({ error: error, errorLib: err_lib });
    }
  }

  async getProperty({ id, property, search, sort, pagination, select }) {
    try {
      await validate([
        {
          obj: { id: id, prop: property, sort: sort, select: select },
          sch: this.validationSchemas.Property,
        },
        { obj: pagination, sch: paginationSchema },
      ]);
      let params = {
        where: {
          id: id,
        },
        select: {
          [property]: {
            select: select,
            orderBy: { [sort.sortBy]: sort.order },
            skip: ~~pagination.skip,
            take: ~~pagination.take,
          },
        },
      };
      if (search) {
        await validate({
          obj: { prop: property, search: search },
          sch: this.validationSchemas.SearchProperty,
        });
        params.select[property].where = { [search.field]: { [search.condition]: search.value } };
      }
      const response = await this.ormManager.get(params);
      return response;
    } catch (error) {
      return handleError({ error: error, errorLib: err_lib });
    }
  }

  async getMany({ search, sort, pagination, select }) {
    try {
      await validate([
        { obj: sort, sch: this.validationSchemas.Sort },
        { obj: pagination, sch: paginationSchema },
      ]);
      if (search) {
        await validate({ obj: search, sch: this.validationSchemas.Search });
        const response = await this.ormManager.getMany({
          where: { [search.field]: { [search.condition]: search.value } },
          select: select,
          orderBy: { [sort.sortBy]: sort.order },
          skip: pagination.skip,
          take: pagination.take,
        });
        return response;
      }

      const response = await this.ormManager.getMany({
        select: select,
        orderBy: { [sort.sortBy]: sort.order },
        skip: pagination.skip,
        take: pagination.take,
      });
      return response;
    } catch (error) {
      return handleError({ error: error, errorLib: err_lib });
    }
  }

  async update({ where, data, select }) {
    try {
      await validate([
        { obj: where, sch: this.validationSchemas.Find },
        { obj: data, sch: this.validationSchemas.Update },
      ]);
      const response = await this.ormManager.update({
        where: where,
        data: data,
        select: select,
      });
      return response;
    } catch (error) {
      return handleError({ error: error, errorLib: err_lib });
    }
  }

  async upsert({ data, select }) {
    try {
      await validate({ obj: data, sch: this.validationSchemas.Upsert });
      const response = await this.ormManager.upsertMany({ data: data, select: select });
      return response;
    } catch (error) {
      return handleError({ error: error, errorLib: err_lib });
    }
  }

  async remove({ where, select }) {
    try {
      await validate({ obj: where, sch: this.validationSchemas.Find });
      const response = await this.ormManager.remove({
        where: { [where.field]: where.value },
        select: select,
      });
      return response;
    } catch (error) {
      return handleError({ error: error, errorLib: err_lib });
    }
  }

  async removeMany({ where }) {
    try {
      if (!where) {
        return {
          success: false,
          statusCode: 400,
          error: {
            message: 'Query id must be provided in a shape like "19STSL0101,19STSL0102,19PREM0101"',
          },
        };
      }
      where.value = convertToArray(where.value);
      await validate({ obj: where, sch: this.validationSchemas.FindMany });
      const response = await this.ormManager.removeMany({
        where: { [where.field]: { in: where.value } },
      });
      return response;
    } catch (error) {
      return handleError({ error: error, errorLib: err_lib });
    }
  }
}
