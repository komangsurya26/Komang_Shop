const { Users, User_Details } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "INI RAHASIA"


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
      return res.status(400).json({
        status:400,
        message: "INPUT SETIDAKNYA EMAIL & PASSWORD!",
      });
    }

    //cek email
    const cekEmail = await Users.findOne({ where: { email } });
    if (cekEmail) {
      return res.status(400).json({
        status:400,
        error: "EMAIL ALREADY IN USE!.",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userData = await Users.create(
      {
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        user_detail: [
          {
            address,
            city,
            postal_code,
            country_code,
          },
        ],
      },
      {
        include: [
          {
            model: User_Details,
            as: "user_detail",
          },
        ],
      }
    );
    
    const responseData = {
      status: 201,
      message: "USER CREATE SUCCESS.",
      data: {
        user: userData,
      },
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
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(404).json({
        status:404,
        message: `USER: ${email} NOT FOUND!!`,
      });
    }

    // Cek Password
    const cekPassword = await bcrypt.compare(password, user.password);
    if (cekPassword) {
      const payload = {
        id: user.id,
        email: user.email,
      };

      const expiredIn = 60 * 60 * 1;
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: expiredIn });

      return res.status(200).json({
        status:200,
        message: "LOGIN SUCCESS!",
        token: token,
      });
    } else {
      return res.status(402).json({
        status:402,
        message: "PASSWORD WRONG!!",
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login };
