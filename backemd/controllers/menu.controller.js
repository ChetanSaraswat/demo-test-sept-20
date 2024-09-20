const { httpStatusCode } = require("../libs/constants");
const { handleError, handleSuccess, customError } = require("../libs/error");
const {User} = require('../models')
console.log('User: ', User);
const { restaurantService, menuService } = require("../services");



exports.CreateMenu = async (req, res) => {
  try {
     const response = await menuService.CreateRMenu(req.body)
     console.log('response: ', response);
    return handleSuccess(res,response,httpStatusCode.OK)
  } 
  catch (error) {
    console.log('error: ', error.message);
    return handleError(res, error);
  }
};

exports.getAllMenu= async (req, res) => {
  try {

      const { restaurant_id } = req.query;
      
      const menu = await menuService.getallMenu({ restaurant_id});
      
      return handleSuccess(res, menu, httpStatusCode.OK);
  } catch (error) {
      console.error('Error:', error.message);
      return handleError(res, error);
  }
};

// exports.getspecificRestaurant= async (req, res) => {
//   try {
      
//       const payload = req.userData
//       console.log('payload: ', payload);
  
//       const response = await restaurantService.getspecificrestaurant(payload)
//       return handleSuccess(res, response, httpStatusCode.OK);
//   } catch (error) {
//       console.error('Error:', error.message);
//       return handleError(res, error);
//   }
// };