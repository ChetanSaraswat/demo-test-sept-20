'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static order_item_association;
    static associate(models) {
      this.order_item_association = OrderItem.belongsTo(models.Order,{
        foreignKey:'order_id',
        targetKey:'order_id',
        as:'order_items'
      });
      this.menu_item_association = OrderItem.belongsTo(models.MenuItem,{
        foreignKey:'menu_item_id',
        targetKey:'menu_item_id',
        as:'menu_items'
      });
    }
  }
  OrderItem.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.UUID,
      references: {
        model: 'order',
        key: 'order_id',
      },
      allowNull: false,
    },
    menu_item_id: {
      type: DataTypes.UUID,
      references: {
        model: 'menuitem',
        key: 'menu_item_id',
      },
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'orderitem',
    paranoid: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at"
  });
  return OrderItem;
};