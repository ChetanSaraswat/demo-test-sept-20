const { sequelize } = require("../models");
exports.baseRepository = class baseRepository {
  constructor({ db_connection, model }) {
    this.db_connection = db_connection;
    this.model = model;
  }

  async create(payload, options) {
    return await this.model.create(payload, options);
  }

  async bulkCreate(payload, options = {}) {
    return await this.model.bulkCreate(payload, options);
  }

  async findOne(criteria, include = [], paranoid = true, attributes, order = [], transaction) {
    return await this.model.findOne({
      where: criteria,
      include: include,
      raw: false,
      paranoid,
      attributes,
      order,
      transaction,
    });
  }

  async findAll(criteria, include = [], paranoid = true, attributes, offset, limit, order = [], group = []) {
    return await this.model.findAll({
      where: criteria,
      include: include,
      paranoid,
      attributes,
      offset: offset,
      limit: limit,
      order: order,
      group,
    });
  }

  async update(criteria, payload, include = [], options = {}, returning = ["*"]) {
    return await this.model.update(payload, {
      where: criteria,
      returning: returning,
      ...options,
    });
  }

  async count(criteria) {
    return await this.model.count({ where: criteria });
  }

  /**
   * When you call the destroy method, a soft-deletion will happen:
   * @param {object} criteria - To destroy records with criteria.
   * @param {boolean} force - If you really want a hard-deletion and your model is paranoid, you can force it using the force: true option:
   * @param {array} include - To destroy records with association.
   */
  async destroy(criteria, force = false, options) {
    return await this.model.destroy({
      where: criteria,
      force,
      options,
    });
  }

  async count_all(criteria) {
    return await this.model.count({ where: criteria });
  }
};