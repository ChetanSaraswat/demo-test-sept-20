require("dotenv").config();
const jwt = require("jsonwebtoken");
const { handleError } = require("../libs/error");
const { userRepositoryObj } = require("../repositories/user.repository");
const authenticateJWT = async (req, res, next) => {
  console.log("===================<<hiii========================================i")
  try {
    console.log('req?.headers?.Authorization: ', req?.headers?.authorization);
    if (!req?.headers?.authorization) {
      return res.status(401).json({ messgae: "Unauthorized", status: 401 });
    }
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    console.log("token: ", token);
    let userData = jwt.verify(token, process.env.JWT_SECRET);
    console.log("userData: ", userData);
    if (userData) {
      if (userData?.user_uuid) {
        const user_uuid = userData?.user_uuid;
        console.log("user_uuid: ", user_uuid);
        userData = await userRepositoryObj.getSpecificUser({
          user_uuid:user_uuid,
        });
      }  else {
        return res.status(401).json({ messgae: "Unauthorized", status: 401 });
      }
      req.userData = userData;
      next();
    } else {
      return res.status(401).json({ messgae: "Invalid User", status: 401 });
    }
  } catch (error) {
    console.log("error:jwt ", error);
    return handleError(res, error);
  }
};

module.exports = authenticateJWT;
