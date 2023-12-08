const { User, User_Details } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET


async function register(req, res, next) {
  try {
    const { user, user_details } = req.body;

    //cek email
    const existingUser = await User.findOne({ where: { email: user.email } });
    if (existingUser) {
      return res.status(400).json({
        error: "EMAIL ALREADY IN USE!.",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Create user
    const userData = await User.create({
      ...user,
      password: hashedPassword,
    });

    // Create user details
    const userDetailsData = await User_Details.create({
      id: userData.id,
      ...user_details,
    });

    // Combine user and user_details into a single response object
    const responseData = {
      message: "USER CREATE SUCCESS.",
      data: [userData, userDetailsData],
    };

    res.status(201).json(responseData);
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    //cekUser
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(401).json({
        message: `USER: ${email} NOT FOUND!!`,
      });
    }

    // Cek Password
    const cekPassword = await bcrypt.compare(password, user.password);
    if (cekPassword) {
      const payload = {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      };

      const expiredIn = 60 * 60 * 1;
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: expiredIn });

      return res.status(200).json({
        message: "LOGIN SUCCESS!",
        token: token,
      });
    } else {
      return res.status(402).json({
        message: "PASSWORD WRONG!!",
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login };
