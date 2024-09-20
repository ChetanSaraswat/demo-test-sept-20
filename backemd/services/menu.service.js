const { customError } = require("../libs/error");
const { Sequelize } = require("../models");
const { menuRepositoryObj } = require("../repositories/menu.repository");
const { restaurantRepositoryObj } = require("../repositories/restaurant.repository");
const { userRepositoryObj } = require("../repositories/user.repository");

exports.CreateRMenu = async (body) => {
    try {
      console.log('body: ', body);
      const {restaurant_id , name , description } = body;
      if( !restaurant_id || !name || !description){
        throw  new customError("Please fill all the fields", 400);
      }
      const attributes = { exclude: ["id"] }
      const restaurant = await restaurantRepositoryObj.getSpecificRestaurant({restaurant_id  },attributes);
      if (!restaurant) {
        throw new customError("restaurant does not exist", 404);
      }
      const menu =  await menuRepositoryObj.createmenu(body)
      return menu.toJSON();
  } 
  catch (error) {
    console.log('error: ', error);
    throw error;
  }
  
};




exports.getallMenu= async(paylaod)=>{
  console.log('paylaod: ', paylaod);
  const restaurant= await menuRepositoryObj.getallmenu({restaurant_id:paylaod.restaurant_id})
  return restaurant;
}
