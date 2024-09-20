const { customError } = require("../libs/error");
const { Sequelize } = require("../models");
const { restaurantRepositoryObj } = require("../repositories/restaurant.repository");
const { userRepositoryObj } = require("../repositories/user.repository");

exports.CreateRestaurant = async (body) => {
    try {
      console.log('body: ', body);
      const {name ,type,openingTime , closingTime,owner_id } = body;
      if(!name || !type || !openingTime || !closingTime || !owner_id){
        throw  new customError("Please fill all the fields", 400);
      }
      const attributes = { exclude: ["id"] };
      const user_uuid=body.owner_id
      const user = await userRepositoryObj.getSpecificUser({user_uuid  },attributes);
      if (!user) {
        throw new customError("Owner does not exist", 404);
      }
      const restaurant =  await restaurantRepositoryObj.createRestaurant(body)
      return restaurant.toJSON();
  } 
  catch (error) {
    console.log('error: ', error);
    throw error;
  }
  
};


exports.getRestaurantData = async (
  { page = 1, size = 10, flag = 'name', search }) => {
    try {
        const p = parseInt(page);
        const limit = parseInt(size);
        let offset = (p - 1) * limit;
        if (p === 1) offset = 0;

        let query = {};

        if (search) {
            query.name = { [Sequelize.Op.iLike]: `%${search}%` }; // Case-insensitive search
        }
        const totalCount = await restaurantRepositoryObj.count(query);
        const restaurant = await restaurantRepositoryObj.getaLLRestaurant(query, limit, offset, flag);

        return {
            Count: totalCount,
            Info: restaurant,
        };
    } catch (error) {
      console.log("error: ", error);
        throw new customError(error.message || "Internal Server Error", 500);
    }
};

exports.getspecificrestaurant= async(paylaod)=>{
  console.log('paylaod: ', paylaod);
  const restaurant= await restaurantRepositoryObj.getSpecificRestaurant({owner_id:paylaod.user_uuid})
  return restaurant;
}
