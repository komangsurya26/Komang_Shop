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
    res.status(200).json(data);
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
        message: "USER UPDATE SUCCESS.",
        user: user,
      };
  
      res.status(201).json(responseData);
    } catch (error) {
      next(error);
    }
}
async function updateDetail (req, res, next) {
    try {
      const userId = req.user.id;
      const user = await User_Details.findOne({
        where: {
          idUser: userId,
        },
      });
  
      if (!user) {
        return res.status(404).json({
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
        message: "DELETE SUCCESS!",
      });
    } catch (error) {
      next(error);
    }
  }
  

module.exports = { getAll, update, deleted, updateDetail };
