'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MenuItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static order_menu_item_association;
    static associate(models) {
      MenuItem.belongsTo(models.Menu, {
        foreignKey: 'menu_id',
        onDelete: 'CASCADE',
        as: 'menu_details'
      });
      this.order_menu_item_association = MenuItem.hasMany(models.OrderItem, {
        foreignKey: 'menu_item_id',
        sourceKey: 'menu_item_id',
        as: 'order_menu_items'
      });

      
    }
  }
  MenuItem.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
      menu_item_id: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        unique: true,
        allowNull: false,
      },
      menu_id: {
        type: DataTypes.UUID,
        references: {
          model: 'menu',
          key: 'menu_id',
        },
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      description: {
        type:DataTypes.STRING,
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    
  }, {
    sequelize,
    modelName: 'MenuItem',
    tableName: 'menuitem',
    paranoid: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at"
  });
  return MenuItem;
};