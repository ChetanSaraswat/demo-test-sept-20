const { httpStatusCode } = require("../libs/constants");
const { handleError, handleSuccess, customError } = require("../libs/error");
const {User} = require('../models')
console.log('User: ', User);
const { restaurantService } = require("../services");



exports.CreateRestaurant = async (req, res) => {
  try {
     const {name ,type,openingTime , closingTime}=req.body
     console.log('req.body: ', req.body);
     req.body.owner_id = req.userData.user_uuid;
     if(req.userData?.role !== User.roles.RESTAURANT){
        throw  new customError("Not authorised to open a Restaurant", 400);
     }
     const response = await restaurantService.CreateRestaurant(req.body)
     console.log('response: ', response);
    return handleSuccess(res,response,httpStatusCode.OK)
  } 
  catch (error) {
    console.log('error: ', error.message);
    return handleError(res, error);
  }
};

exports.getAllRestaurant = async (req, res) => {
  try {
    console.log('================================================hfhfdkjdf')
      const { page, size, flag, search } = req.query;
      
      const restaurant = await restaurantService.getRestaurantData({ page, size, flag, search });
      
      return handleSuccess(res, restaurant, httpStatusCode.OK);
  } catch (error) {
      console.error('Error:', error.message);
      return handleError(res, error);
  }
};

exports.getspecificRestaurant= async (req, res) => {
  try {
      
      const payload = req.userData
      console.log('payload: ', payload);
  
      const response = await restaurantService.getspecificrestaurant(payload)
      return handleSuccess(res, response, httpStatusCode.OK);
  } catch (error) {
      console.error('Error:', error.message);
      return handleError(res, error);
  }
};
