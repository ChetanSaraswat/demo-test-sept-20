const { sequelize } = require("../config").db_connection;
const { Menu } = require("../models");
const { baseRepository } = require("./base.repository");
class MenuRepository extends baseRepository { 
  constructor(payload) {
    super(payload);
  }
  async createmenu(payload) {
    console.log('payload: ', payload);
    return await this.create(payload);
}


  
  async getallmenu(field, attributes = {}) {
    let criteria = field;
    let include = [];
    attributes = attributes;
    let order = [];
    return await this.findAll(
      criteria,
      include,
      true,
      attributes,
      order
    );
  }

  async getaLLMenu(query, limit, offset, flag) {
    return await this.model.findAll({
        where: query,
        offset: offset,
        limit: limit,
        order: [[flag, 'ASC']],
        collation: { locale: 'en', strength: 2 }, 
    });
}
}
  module.exports = {
    menuRepositoryObj: new MenuRepository({
      dbconnection: sequelize,
      model: Menu,
    }),
  };