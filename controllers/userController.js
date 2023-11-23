const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");
// login callback
async function hashpass(password) {
  const res = await bcryptjs.hash(password, 10);
  return res;
}
async function compare(userpass, hashpass) {
  const res = await bcryptjs.compare(userpass, hashpass);
  return res;
}
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    const passcheck = await compare(password, user.password);
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    if (user && passcheck) {
      res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

//Register Callback
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const data = {
      name: req.body.name,
      email: req.body.email,
      password: await hashpass(req.body.password),
    };
    await userModel.insertMany([data]);
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = { loginController, registerController };
