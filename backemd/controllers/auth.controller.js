const { httpStatusCode } = require("../libs/constants");
const { handleError, handleSuccess } = require("../libs/error");
const { authService } = require("../services");
const jwt =require("jsonwebtoken");

exports.signInUser = async (req, res) => {
  try {
    const response = await authService.loginUser(req.body);
    let{password, ...jwtPayload }= response
    const token = jwt.sign(jwtPayload,process.env.JWT_SECRET,{ expiresIn : process.env.JWT_EXPIRY})
    const userData={...jwtPayload}
    userData['token'] = token;
    return handleSuccess(res,userData,httpStatusCode.OK)
  } 
  catch (error) {
    console.log('error: ', error.message);
    return handleError(res, error);
  }
};

exports.signUpUser = async (req, res) => {
  console.log("req: ", req);
    try {
        const  response = await authService.signUpUser(req.body);
       return handleSuccess(res,{message:'user created successfully'},httpStatusCode.OK)
    } 
    catch (error) {
      console.log('error: ', error.message);
      return handleError(res, error);
    }
  };