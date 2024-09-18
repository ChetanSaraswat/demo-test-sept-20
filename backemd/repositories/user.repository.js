const { sequelize } = require("../config").db_connection;
const { User } = require("../models");
const { baseRepository } = require("./base.repository");
class UserRepository extends baseRepository {
  constructor(payload) {
    super(payload);
  }

      async createUser(payload) {
          return await this.create(payload);
      }

      async getSpecificUser(field, attributes = {}) {
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

}
  
  module.exports = {
    userRepositoryObj: new UserRepository({
      dbconnection: sequelize,
      model: User,
    }),
  };
  