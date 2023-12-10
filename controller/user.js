const { Users, User_Details } = require("../models");
const bcrypt = require("bcrypt");

async function getAll(req, res, next) {
  try {
    const data = await Users.findAll({
      include: [
        {
          model: User_Details,
          as: "user_detail",
        },
      ],
    });
    res.status(200).json({
        status:200,
        data: data
    });
  } catch (error) {
    next(error);
  }
}
async function getOne(req, res, next) {
  try {
    const { id } = req.params;
    const data = await Users.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User_Details,
          as: "user_detail",
        },
      ],
    });
    if (!data) {
      return res.status(404).json({
        status:404,
        message: "USER NOT FOUND!",
      });
    }
    res.status(200).json({
        status:200,
        data: data
    });
  } catch (error) {
    next(error);
  }
}

async function createUserDetails(req, res, next) {
  try {
    const userId = req.user.id;
    const { address, city, postal_code, country_code } = req.body;
    const data = await User_Details.create({
      idUser: userId,
      address,
      city,
      postal_code,
      country_code,
    });
    const response = {
      status: 201,
      message: "CREATE USER DETAILS SUCCESS",
      data: data,
    };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const userId = req.user.id;
    const user = await Users.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        status:404,
        message: "USER NOT FOUND!",
      });
    }

    const { firstName, lastName, email, password, phone, isAdmin } = req.body;

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.password = password ? await bcrypt.hash(password, 10) : user.password;
    user.phone = phone || user.phone;
    user.isAdmin = isAdmin || user.isAdmin;

    await user.save(); // Save the changes to the database

    const responseData = {
      status: 200,
      message: "USER UPDATE SUCCESS.",
      user: user,
    };

    res.status(200).json(responseData);
  } catch (error) {
    next(error);
  }
}
async function updateDetail(req, res, next) {
  try {
    const userId = req.user.id;
    const user = await User_Details.findOne({
      where: {
        idUser: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        status:404,
        message: "USER NOT FOUND!",
      });
    }

    const { address, city, postal_code, country_code } = req.body;

    user.address = address || user.address;
    user.city = city || user.city;
    user.postal_code = postal_code || user.postal_code;
    user.country_code = country_code || user.country_code;

    await user.save(); // Save the changes to the database

    const responseData = {
      status: 201,
      message: "USER DETAILS UPDATE SUCCESS.",
      user: user,
    };

    res.status(201).json(responseData);
  } catch (error) {
    next(error);
  }
}
async function deleted(req, res, next) {
  try {
    const userId = req.user.id;
    const user = await Users.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "USER NOT FOUND or ALREADY DELETED.",
      });
    }

    await Users.destroy({
      where: {
        id: userId,
      },
    });

    res.status(200).json({
      status: 200,
      message: "DELETE SUCCESS!",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
  getOne,
  update,
  deleted,
  updateDetail,
  createUserDetails,
};
