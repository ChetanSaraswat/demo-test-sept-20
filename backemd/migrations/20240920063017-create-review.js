'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('review', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      review_id: {
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        unique: true,
        allowNull: false,
      },
      restaurant_id: {
        type: Sequelize.UUID,
        references: {
          model: 'restaurant',
          key: 'restaurant_id',
        },
        allowNull: false,
      },
      user_uuid: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'user_uuid',
        },
        allowNull: false,
      },
      rating: {
        type: Sequelize.INTEGER, // rating 1 to 5
        allowNull: false,
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('review');
  }
};