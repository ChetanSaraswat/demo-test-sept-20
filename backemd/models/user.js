'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static roles = {
      CUSTOMER: "CUSTOMER",
      RESTAURANT: "RESTAURANT",
      ADMIN:"ADMIN"
    };
    static user_restaurant_association;
    static user_address_association;
    static  user_review_association;
    static  user_order_association;

    static associate(models) {
      this.user_restaurant_association = User.hasMany(models.Restaurant, {
        foreignKey: 'owner_id',
        sourceKey: 'user_uuid',
        as: 'restaurant_details'
      })
      this.user_address_association = User.hasMany(models.Address, {
        foreignKey: 'resident_id',
        sourceKey: 'user_uuid',
        as: 'address_details'
      })
      this.user_review_association= User.hasMany(models.Review,{
        foreignKey:'user_uuid',
        sourceKey:'user_uuid',
        as:'user_reviews'
      })
      this.user_order_association= User.hasMany(models.Order,{
        foreignKey:'user_uuid',
        sourceKey:'user_uuid',
        as:'user_order'
      })
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
    },    
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Please Provide a valid email",
        },
        notEmpty: {
          msg: "email cannot be an empty string",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [8],
          msg: "Password length should be more than 8."
        },
        is: {
          args: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
          msg: "Password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character."
        }
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM(...Object.values(User.roles)),
      validate: {
        isIn: {
          args: [Object.values(User.roles)],
        },
      },
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    paranoid: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at"
  });

  return User;
};
