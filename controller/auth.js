const { Users, User_Details } = require("../models");
const bcrypt = require("bcrypt");
const { SuccessResponse, ErrorResponse } = require("../middleware/handlerMiddleware");
const { generateJwtToken } = require("../utils/jwt");


async function register(req, res, next) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      city,
      postal_code,
      country_code,
    } = req.body;

    if (!email || !password) {
      res.status(400).json(new ErrorResponse("Input Email & Password", 400));
    }

    //cek email
    const cekEmail = await Users.findOne({ where: { email } });
    if (cekEmail) {
      res.status(409).json(new ErrorResponse("Email Already Exist!", 409));
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = await Users.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });
    await User_Details.create({
      user_id: user.id,
      address: address || null,
      city: city || null,
      postal_code: postal_code || null,
      country_code: country_code || null,
    });

    return res
      .status(201)
      .json(new SuccessResponse("User Create Success!!", 201, user));
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    //cekUser
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      const response = new ErrorResponse("Email Not Found!", 404);
      res.status(404).json(response)
    }

    // Cek Password
    const cekPassword = await bcrypt.compare(password, user.password);
    if (cekPassword) {
      //create Token Jwt
      const token = generateJwtToken(user)

      const response = new SuccessResponse("Login Succcess! 👏", 200, {token:token})

      return res.status(200).json(response);
    } else {
      const response = new ErrorResponse("Incorrect Password! 👎", 401);
      return res.status(401).json(response);
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login };
