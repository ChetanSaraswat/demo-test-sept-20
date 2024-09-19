const { customError } = require("../libs/error");
const { userRepositoryObj } = require("../repositories/user.repository");
// const {faltukapusher}= require("../pusher");

const bcrypt = require("bcrypt");
const { Sequelize } = require("../models");

exports.loginUser = async (body) => {
  try {
      const { email,password } = body;
      const attributes = { exclude: ["id"] };
      const user = await userRepositoryObj.getSpecificUser({ email },attributes);
      if (!user) {
        throw new customError("user Not Found", 404);
      }
      const is_password_valid = await bcrypt.compare(password, user.password);
      if (!is_password_valid) {
        throw new customError("Password is Incorrect", 400);
      }
      return user.toJSON();
  } 
  catch (error) {
    throw error;
  }
};

exports.signUpUser=  async (body) => {
  try {
      const {name , email , password} = body;
      if(!name || !email || !password){
        throw  new customError("Please fill all the fields", 400);
      }
      const user  = await userRepositoryObj.getSpecificUser({email})
      if(user && user.email){
        throw new customError("User already exist", 400)
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      body.password=hashedPassword;
      const response = await userRepositoryObj.create(body);
      if(!response){
        throw new customError("User not created", 400)
      }
      // await faltukapusher('user created ollalalala')
      return response
  }
  catch(error){
    console.log("error: ", error);
      throw error;
  }
}

exports.getUserData = async (
  { page = 1, size = 10, flag = 'name', designation, search }) => {
    try {
        const p = parseInt(page);
        const limit = parseInt(size);
        let offset = (p - 1) * limit;
        if (p === 1) offset = 0;

        let query = {};

        if (designation) {
            query.designation = designation;
        }

        if (search) {
            query.name = { [Sequelize.Op.iLike]: `%${search}%` }; // Case-insensitive search
        }
        const totalCount = await userRepositoryObj.count(query);
        const users = await userRepositoryObj.getUsers(query, limit, offset, flag);

        return {
            Count: totalCount,
            Info: users,
        };
    } catch (error) {
      console.log("error: ", error);
        throw new customError(error.message || "Internal Server Error", 500);
    }
};


