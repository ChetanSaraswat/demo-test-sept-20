'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static user_review_association;
    static restaurant_review_association;
    static associate(models) {
      this.user_review_association = Review.belongsTo(models.User,{
        foreignKey:'user_uuid',
        as:'user_reveiws'
      });
      this.restaurant_review_association = Review.belongsTo(models.Restaurant,{
        foreignKey:'user_uuid',
        as:'restaurant_reveiws'
      });

    }
  }
  Review.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    review_id: {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
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
    user_uuid: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'user_uuid',
      },
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER, // rating 1 to 5
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Review',
    tableName: 'review',
    paranoid: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at"
  });
  return Review;
};