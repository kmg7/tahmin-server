import { orm_error_handler } from './orm_error_parser.js';
import ormClient from './orm_client.js';

export class ORMManager {
  model;
  constructor({ model }) {
    this.model = model;
  }

  async create({ data, select }) {
    try {
      const response = await ormClient[this.model].create({
        data: data,
        select: select,
      });
      return { success: true, data: response };
    } catch (error) {
      return orm_error_handler(error);
    }
  }

  async createMany({ data }) {
    try {
      const response = await ormClient[this.model].createMany({
        data: data,
      });
      return { success: true, data: response };
    } catch (error) {
      return orm_error_handler(error);
    }
  }

  async get({ where, select }) {
    try {
      const response = await ormClient[this.model].findUnique({
        where: where,
        select: select,
      });
      return { success: true, data: response };
    } catch (error) {
      return orm_error_handler(error);
    }
  }

  async getMany({ orderBy, select, where, skip, take }) {
    try {
      let params = {
        skip: ~~skip,
        take: ~~take,
        orderBy: orderBy,
        select: select,
      };
      if (where) {
        params.where = where;
      }
      const response = await ormClient[this.model].findMany(params);
      return { success: true, data: response };
    } catch (error) {
      return orm_error_handler(error);
    }
  }

  async update({ data, where, select }) {
    try {
      const response = await ormClient[this.model].update({
        where: where,
        data: data,
        select: select,
      });
      return { success: true, data: response };
    } catch (error) {
      return orm_error_handler(error);
    }
  }

  async upsertMany({ data, select }) {
    try {
      const response = await ormClient.$transaction(
        data.map((element) =>
          ormClient[this.model].upsert({
            where: { [element.where.field]: element.where.value },
            update: element.update,
            create: element.create,
            select: select,
          })
        )
      );
      return { success: true, data: response };
    } catch (error) {
      return orm_error_handler(error);
    }
  }

  async remove({ where, select }) {
    try {
      const response = await ormClient[this.model].delete({
        where: where,
        select: select,
      });
      return { success: true, data: response };
    } catch (error) {
      return orm_error_handler(error);
    }
  }

  async removeMany({ where }) {
    try {
      const response = await ormClient[this.model].deleteMany({
        where: where,
      });
      return { success: true, data: response };
    } catch (error) {
      return orm_error_handler(error);
    }
  }
}
