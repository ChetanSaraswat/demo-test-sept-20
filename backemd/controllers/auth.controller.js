const { httpStatusCode } = require("../libs/constants");
const { handleError, handleSuccess } = require("../libs/error");
const { authService } = require("../services");
const jwt =require("jsonwebtoken");

exports.signInUser = async (req, res) => {
  try {
    const response = await authService.loginUser(req, res);
    let jwtPayload = { ...response }
    delete jwtPayload?.role_details;

    const token = jwt.sign(jwtPayload,process.env.JWT_SECRET,{ expiresIn : process.env.JWT_EXPIRY})
    const userData = {...response};
    userData['token'] = token;

    return handleSuccess(res,userData,httpStatusCode.OK)
  } 
  catch (error) {
    console.log('error: ', error.message);
    return handleError(res, error);
  }
};

exports.signUpUser = async (req, res) => {
    try {

  
      return handleSuccess(res,userData,httpStatusCode.OK)
    } 
    catch (error) {
      console.log('error: ', error.message);
      return handleError(res, error);
    }
  };