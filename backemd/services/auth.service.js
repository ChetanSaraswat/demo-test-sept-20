

exports.loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    const attributes = { exclude: ["id", "department_id", "role_id"] };
    const user = await employeeRepositoryObj.getSpecificEmployee({ email }, attributes);
    if (!user) {
      throw new customError("employee Not Found", 404);
    }
    const is_password_valid = await bcrypt.compare(req.body.password, user.password);
    if (!is_password_valid) {
      throw new customError("Password is Incorrect", 400);
    }
    const { password, ...updatedUser } = user.toJSON();
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

exports.signUpUser=  async (req, res) => {
    try {
        // const {email , password} = req.body;
        // const user  =
        //  const hashedPassword = await bcrypt.hash(password, 10);
    }
    catch(error){
        throw error;
    }
}

