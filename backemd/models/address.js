'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static deliver_address_association;
    static pick_up_address_association;
    static address_restaurant_association;
    static associate(models) {
      Address.belongsTo(models.User, {
        foreignKey: 'resident_id',
        targetKey:'user_uuid',
        onDelete: 'CASCADE',
        as: 'resident'
      });
      // this.address_restaurant_association=Address.belongsTo(models.Restaurant, {
      //   foreignKey: 'restaurant_id',
      //   targetKey:'restaurant_id',
      //   onDelete: 'CASCADE',
      //   as: 'restaurant_resident'
      // });
      this.pick_up_address_order_association = Address.hasMany(models.Order, {
        foreignKey: 'pick_up_address_id',
        sourceKey: 'address_id',
        as: 'pick_up_orders'
      });
      
      this.deliver_address_order_association = Address.hasMany(models.Order, {
        foreignKey: 'delivery_address_id',
        sourceKey: 'address_id',
        as: 'deliver_orders'
      });
    }
  }
  Address.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    address_id: {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
    },
    resident_id: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'user_uuid',
      },
      allowNull: true,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    addressLine1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressLine2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Address',
    tableName: 'address',
    paranoid: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at"
  });
  return Address;
};