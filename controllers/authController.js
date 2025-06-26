const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const SECRET_TOCKEN = "mysecretkey"; // Replace with your actual secret key

exports.protrect = async (req, res, next) => {
 const accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.status(401).json({
      message: "plsease login to access this route",
    });
  }
  try {
    const decoded = jwt.verify(accessToken, SECRET_TOCKEN);
    req.user = await User.findById(decoded.userId);
  } 
    catch (ex) {
    console.error(ex.message);
    return res.status(401).json({
      message: ex.message + ": plsease login to access this route",
    });
  }
  

  next();
}




exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and Password are Required ",
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }
  const isPassCorrect = await bcrypt.compare(password, user.password);

  if (!isPassCorrect) {
    return res.status(401).json({
      message: "Incorrect Password",
    });
  }

  const accessToken = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      name : user.firstName + " " + user.lastName,
    },
    SECRET_TOCKEN, // Replace with your actual secret key
    { expiresIn: 60 * 60 }
  );

  return res.status(200).json({
    accessToken,
    message: "User Logged in  successfully",
  });
};

exports.register = async (req, res) => {
  try {
    const UserData = req.body;
    const hasedpass = await bcrypt.hash(UserData.password, 12);
    await User.create({ ...UserData, password: hasedpass });
    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (ex) {
    console.error(ex.message);
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};
