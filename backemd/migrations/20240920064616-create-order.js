'use strict';
/** @type {import('sequelize-cli').Migration} */
const {Order} = require("../models");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    order_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
      allowNull: false
    },
    user_uuid: {
      type: Sequelize.UUID,
      references: {
        model: 'users',
        key: 'user_uuid'
      },
      allowNull: false
    },
    restaurant_id: {
      type: Sequelize.UUID,
      references: {
        model: 'restaurant',
        key: 'restaurant_id'
      },
      allowNull: false
    },
    totalAmount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    delivery_address_id: {
      type: Sequelize.UUID,
      references: {
        model: 'address',
        key: 'address_id'
      },
      allowNull: false
    },
    pick_up_address_id: {
      type: Sequelize.UUID,
      references: {
        model: 'address',
        key: 'address_id'
      },
      allowNull: false
    },
    deliveryAgentId: {
      type: Sequelize.UUID,
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM(...Object.values(Order.Status)),
      validate: {
        isIn: [Object.values(Order.Status)]
      },
      defaultValue: Order.Status.Pending,
      allowNull: true
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order');
  }
};