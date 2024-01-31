const { sequelize } = require("../models/index");
const { SuccessResponse, ErrorResponse } = require("../utils/respons");
const { Users, Order, Items } = require("../models");

async function createOrder(req, res, next) {
  const transaction = await sequelize.transaction();

  try {
    const user_id = +req.params.user_id;
    const { item_id, quantity } = req.body;

    const findUser = await Users.findByPk(user_id, { transaction });
    if (!findUser) {
      const response = new ErrorResponse("User Not Found!", 404);
      res.status(404).json(response);
      await transaction.rollback();
      return;
    }

    const item = await Items.findOne({ where: { id: item_id }, transaction });
    if (!item) {
      const response = new ErrorResponse("Item Not Found", 404);
      res.status(404).json(response);
      await transaction.rollback();
      return;
    }

    const total_amount = item.item_price * quantity;
    const total_order_price = total_amount * 1.1;

    const order = await Order.create(
      {
        user_id,
        quantity,
        status_order: "Pending",
        total_order_price,
      },
      { transaction }
    );

    await order.addItems(item, {
      through: { quantity, total_amount },
      transaction,
    });

    const responseOrder = await Order.findByPk(order.id, {
      include: {
        model: Items,
        as: "items",
        attributes: { exclude: ["created_at", "updated_at"] }, //untuk menambahkan pengecualian dalam colom tersebut
        through: {
          as: "order_items",
          attributes: ["quantity", "total_amount"],
        },
      },
      transaction,
    });

    await transaction.commit();

    const response = new SuccessResponse(
      "Order created successfully",
      201,
      responseOrder
    );
    res.status(201).json(response);
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
}

async function orderSuccess(req, res, next) {
  try {
    const { order_id } = req.body;
    const updateOrder = await Order.findOne({ where: { id: order_id } });
    if (!updateOrder) {
      const response = new ErrorResponse("Order Not Found!", 404);
      return res.status(404).json(response);
    } else {
      updateOrder.status_order = "Success";

      await updateOrder.save();
      const response = new SuccessResponse(
        "Order Update Success!",
        200,
        updateOrder
      );
      res.status(200).json(response);
    }
  } catch (error) {
    next(error);
  }
}

async function getOrderDetails(req, res, next) {
  try {
    const { order_id } = req.body;

    // Dapatkan detail order beserta produknya
    const order = await Order.findByPk(order_id, {
      include: {
        model: Items,
        as: "items",
        attributes: { exclude: ["created_at", "updated_at"] },
        through: {
          as: "order_items",
          attributes: ["quantity", "total_amount"],
        },
      },
    });

    if (!order) {
      const response = new ErrorResponse("Order Not Found!", 404);
      return res.status(404).json(response);
    }
    const response = new SuccessResponse("Get Order Success!", 200, order);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = { createOrder, orderSuccess, getOrderDetails };
