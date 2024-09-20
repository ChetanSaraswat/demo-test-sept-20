'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static menu_item_association;
    static associate(models) {
      Menu.belongsTo(models.Restaurant, {
        foreignKey: 'restaurant_id',
        onDelete: 'CASCADE',
        as: 'menu_details'
      });
      this.menu_item_association =  Menu.hasMany(models.MenuItem, {
       foreignKey:'menu_id',
       sourceKey:'menu_id',
       onDelete:'CASCADE',
       as:'menu_item_detais'
    })
  }
}
  Menu.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    menu_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Menu',
    tableName: 'menu',
    paranoid: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at"
  });
  return Menu;
};
