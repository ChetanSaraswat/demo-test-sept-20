'use strict';
/** @type {import('sequelize-cli').Migration} */
const {Restaurant} = require('../models')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('restaurant', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      restaurant_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      owner_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',  // Ensure it references the correct table
          key: 'user_uuid',  // Ensure it references the correct column in the users table
        },
        allowNull: false,
      },      
      rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
      },
      type: {
        type: Sequelize.ENUM(...Object.values(Restaurant.Type)),
        validate: {
          isIn: {
            args: [Object.values(Restaurant.Type)],
          },
        },
        allowNull: true,
      },
      openingTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      closingTime: {
        type: Sequelize.TIME,
        allowNull: false,
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
    await queryInterface.dropTable('restaurant');
  }
};