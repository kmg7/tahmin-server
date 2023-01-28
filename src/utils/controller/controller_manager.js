import { handleResponse, handleInternalError } from './controller_utils.js';

export class ControllerManager {
  service;

  constructor({ service }) {
    this.service = service;
  }

  async create(req, res, fields) {
    try {
      const response = await this.service.create({ data: req.body, select: fields });
      handleResponse({ serviceRes: response, res: res, statusCode: 201 });
    } catch (error) {
      handleInternalError({ req: req, res: res, err: error });
    }
  }

  async createMany(req, res, fields) {
    try {
      const response = await this.service.createMany({ data: req.body, select: fields });
      handleResponse({ serviceRes: response, res: res, statusCode: 201 });
    } catch (error) {
      handleInternalError({ req: req, res: res, err: error });
    }
  }

  async get(req, res, fields) {
    try {
      const { wh: field, val: value } = req.query;
      const response = await this.service.get({ where: { field: field, value: value }, select: fields });
      handleResponse({ serviceRes: response, res: res });
    } catch (error) {
      handleInternalError({ req: req, res: res, err: error });
    }
  }

  async getMany(req, res, fields, search) {
    try {
      const { wh: field, cond: condition, val: value, sort: sortBy, order: order, skip: skip, take: take } = req.query;
      let params = {
        sort: { sortBy: sortBy ?? 'id', order: order ?? 'asc' },
        pagination: { skip: skip ?? 0, take: take ?? 30 },
        select: fields,
      };
      if (search) {
        params.search = { field: field, condition: condition, value: value };
      }
      const response = await this.service.getMany(params);
      handleResponse({ serviceRes: response, res: res });
    } catch (error) {
      handleInternalError({ req: req, res: res, err: error });
    }
  }

  async getProperty(req, res, propFields) {
    try {
      const { prop: property, id: id } = req.params;
      const { wh: field, cond: condition, val: value, sort: sortBy, order: order, skip: skip, take: take } = req.query;
      let params = {
        id: id,
        property: property,
        select: propFields,
        sort: { sortBy: sortBy ?? 'id', order: order ?? 'asc' },
        pagination: { skip: skip ?? 0, take: take ?? 30 },
      };
      if (field && condition && value) {
        params.search = { field: field, condition: condition, value: value };
      }
      const response = await this.service.getProperty(params);
      handleResponse({ serviceRes: response, res: res });
    } catch (error) {
      handleInternalError({ req: req, res: res, err: error });
    }
  }

  async update(req, res, fields) {
    try {
      const { wh: field, val: value } = req.query;
      const response = await this.service.update({ where: { field: field, value: value }, data: req.body, select: fields });
      handleResponse({ serviceRes: response, res: res });
    } catch (error) {
      handleInternalError({ req: req, res: res, err: error });
    }
  }

  async upsert(req, res, fields) {
    try {
      const response = await this.service.upsert({ data: req.body, select: fields });
      handleResponse({ serviceRes: response, res: res });
    } catch (error) {
      handleInternalError({ req: req, res: res, err: error });
    }
  }

  async remove(req, res, fields) {
    try {
      const { wh: field, val: value } = req.query;
      const response = await this.service.remove({ where: { field: field, value: value }, select: fields });
      handleResponse({ serviceRes: response, res: res });
    } catch (error) {
      handleInternalError({ req: req, res: res, err: error });
    }
  }

  async removeMany(req, res) {
    try {
      const { wh: field, val: value } = req.query;
      const response = await this.service.removeMany({ where: { field: field, value: value } });
      handleResponse({ serviceRes: response, res: res });
    } catch (error) {
      handleInternalError({ req: req, res: res, err: error });
    }
  }
}
