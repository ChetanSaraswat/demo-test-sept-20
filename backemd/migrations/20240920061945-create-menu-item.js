'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('menuitem', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
        menu_item_id: {
          type: Sequelize.UUID,
          defaultValue:Sequelize.UUIDV4,
          unique: true,
          allowNull: false,
        },
        menu_id: {
          type: Sequelize.UUID,
          references: {
            model: 'menu',
            key: 'menu_id',
          },
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        description: {
          type:Sequelize.STRING,
          allowNull: true,
        },
        imageUrl: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        isAvailable: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
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
    await queryInterface.dropTable('menuitem');
  }
};