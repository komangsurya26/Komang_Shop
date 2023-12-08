const { User, User_Details } = require("../models");
const bcrypt = require("bcrypt");

async function getAll(req, res, next) {
  try {
    const data = await User.findAll({
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
    const { user, user_details } = req.body;

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const update = await User.update(
      {
        ...user,
        id: userId,
        password: hashedPassword,
        updateAt: new Date(),
      },
      {
        where: {
          id: userId,
        },
        returning: true,
      }
    );
    const updateDetail = await User_Details.update(
      {
        ...user_details,
        id: userId,
        updateAt: new Date(),
      },
      {
        where: {
          id: userId,
        },
        returning: true,
      }
    );
    const responseData = {
      message: "USER UPDATE SUCCESS.",
      user: update[1],
      detail: updateDetail[1],
    };

    res.status(201).json(responseData);
  } catch (error) {
    next(error);
  }
}

async function deleted(req, res, next) {
  try {
    const userId = req.user.id;
    const deletes = await User.destroy({
      where: {
        id: userId,
      },
    });

    if (deletes === 0) {
      return res.status(404).json({
        message: "USER NOT FOUND or ALREADY DELETED.",
      });
    }

    res.status(200).json({
      deletes,
      message: "DELETE SUCCESS!",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAll, update, deleted };
