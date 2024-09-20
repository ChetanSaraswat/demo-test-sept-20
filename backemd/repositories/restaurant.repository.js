const { sequelize } = require("../config").db_connection;
const { Restaurant } = require("../models");
console.log('Restaurant: ', Restaurant);
const { baseRepository } = require("./base.repository");
class RestaurantRepository extends baseRepository { 
  constructor(payload) {
    super(payload);
  }
  async createRestaurant(payload) {
    console.log('payload: ', payload);
    return await this.create(payload);
}

  async getSpecificRestaurant(field, attributes = {}) {
    let criteria = field;
    let include = [];
    attributes = attributes;
    let order = [];
    return await this.findOne(
      criteria,
      include,
      true,
      attributes,
      order
    );
  }
  
  async getSpecificRestaurant(field, attributes = {}) {
    let criteria = field;
    let include = [];
    attributes = attributes;
    let order = [];
    return await this.findOne(
      criteria,
      include,
      true,
      attributes,
      order
    );
  }

  async getaLLRestaurant(query, limit, offset, flag) {
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
    restaurantRepositoryObj: new RestaurantRepository({
      dbconnection: sequelize,
      model: Restaurant,
    }),
  };