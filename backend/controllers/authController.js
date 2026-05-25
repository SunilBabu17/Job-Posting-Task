const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const pwd = await bcrypt.hash(password, 10);
    const existingUser = await User.find({ email });
    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const newUser = new User({
      username,
      email,
      password: pwd,
      role,
    });
    await newUser.save();
    const user = await User.findOne({ email }).select(-password);
    const jwt_data = jwt.sign(
      { username: username, email: email, role: role },
      process.env.JWT_SCERT,
      { expiresIn: "1d" },
    );
    return res.status(201).json({
      success: true,
      message: "User Created Successfully",
      token: jwt_data,
      data: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const jwt_data = jwt.sign(
        { username: user.username, email: user.email, role: user.role },
        process.env.JWT_SCERT,
        { expiresIn: "1d" },
      );
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token: jwt_data,
        data: {
          username: user.username,
          email,
          role: user.role,
        },
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { register, login };
