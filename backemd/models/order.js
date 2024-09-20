'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static Status = {
      Pending :'Pending',
      Accepted : 'Accepted',
      Preparing :'Preparing',
      Out_for_delivery :'Out_for_delivery',
      Delivered :'Delivered',
      Cancelled :'Cancelled',
      Received :'Received'
    };

    static user_order_association;
    static restaurant_order_association;
    static deliver_order_address_association;
    static pick_up_order_address_association;
    static associate(models) {
      this.user_order_association = Order.belongsTo(models.User,{
        foreignKey:'user_uuid',
        targetKey:'user_uuid',
        as:'user_order'
      });
      this.order_item_association = Order.hasMany(models.OrderItem,{
        foreignKey:'order_id',
        sourceKey:'order_id',
        as:'order_items'
      });
      this.restaurant_order_association = Order.belongsTo(models.Restaurant,{
        foreignKey:'restaurant_id',
        targetKey:'restaurant_id',
        as:'restaurant_order'
      });
      this.pick_up_order_address_association = Order.belongsTo(models.Address, {
        foreignKey: 'pick_up_address_id',
        targetKey: 'address_id',
        as: 'pick_up_orders'
      });
      
      this.deliver_order_address_association = Order.belongsTo(models.Address, {
        foreignKey: 'delivery_address_id',
        targetKey: 'address_id',
        as: 'deliver_orders'
      });
    }
  }
  Order.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
    },
    user_uuid: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'user_uuid',
      },
      allowNull: false,
    },
    restaurant_id: {
      type: DataTypes.UUID,
      references: {
        model: 'restaurant',
        key: 'restaurant_id',
      },
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    delivery_address_id: {
      type: DataTypes.UUID,
      references: {
        model: 'address',
        key: 'address_id',
      },
      allowNull: false,
    },
    pick_up_address_id: {
      type: DataTypes.UUID,
      references: {
        model: 'address',
        key: 'address_id',
      },
      allowNull: false,
    },
    
    deliveryAgentId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(Order.Status)),
      validate: {
        isIn: {
          args: [Object.values(Order.Status)],
        },
      },
      defaultValue:Order.Status.Pending,
      allowNull: true,
    },

  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'order',
    paranoid: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at"
  });
  return Order;
};
