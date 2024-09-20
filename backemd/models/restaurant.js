'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    static Type = {
      Italian :'Italian',
      Indochinese : 'Indochinese',
      Indian :'Indian',
      Mexican :'Mexican',
      Seafood :'Seafood',
      Japanese :'Japanese',
      Steakhouse :'Steakhouse'
    };
    static restaurant_menu_association;
    static restaurant_review_association;
    static restaurant_order_association;
    static  restaurant_address_association;
    static associate(models) {
      this.restaurant_menu_association= this.hasMany(models.Menu, {
        foreignKey: 'restaurant_id',
        sourceKey:'restaurant_id',
        onDelete: 'CASCADE',
        as: 'menu_details'
      });
      this.restaurant_review_association= Restaurant.hasMany(models.Review,{
        foreignKey:'restaurant_id',
        sourceKey:'restaurant_id',
        as:'restaurant_reviews'
      })
      this.restaurant_order_association= Restaurant.hasMany(models.Order,{
        foreignKey:'restaurant_id',
        sourceKey:'restaurant_id',
        as:'restaurant_order'
      })
      this.restaurant_user_association = Restaurant.belongsTo(models.User, {
        foreignKey: 'owner_id',
        targetKey: 'user_uuid',
        as: 'restaurant_details'
      })
    //   this.restaurant_address_association= Restaurant.belongsTo(models.Address,{
    //   foreignKey:'restaurant_id',
    //   targetKey:'restaurant_id',
    //   as:'restaurant_address'

    // })
  }
  }
  Restaurant.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      restaurant_id: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      owner_id: {
        type: DataTypes.UUID,
        references: {
          model: 'users',   // Make sure the model name is correctly defined in the database
          key: 'user_uuid',   // Reference the correct foreign key
        },
        allowNull: false,
      },
      
      rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
      },
      type: {
        type: DataTypes.ENUM(...Object.values(Restaurant.Type)),
        validate: {
          isIn: {
            args: [Object.values(Restaurant.Type)],
          },
        },
        allowNull: true,
      },
      openingTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      closingTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
  }, {
    sequelize,
    modelName: 'Restaurant',
    tableName: 'restaurant',
    paranoid: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at"
  });
  return Restaurant;
};