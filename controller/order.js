const { ErrorResponse, SuccessResponse } = require("../middleware/handlerMiddleware");
const { Users,Order, Items } = require("../models");
const { getFormattedDate } = require("../utils/date");
const dateFormat = getFormattedDate()

async function createOrder(req, res, next) {
  try {
    const user_id = +req.params.user_id 
    const { item_id, quantity } = req.body;

    const findUser = await Users.findByPk(user_id)
    if (!findUser) {
      const response = new ErrorResponse("User Not Found!", 404);
      res.status(404).json(response);
    }
    
    const item = await Items.findOne({ where: { id: item_id } });
    if (!item) {
      const response = new ErrorResponse("Id Items Not Found", 404);
      res.status(404).json(response);
    }
    const total_amount = item.item_price * quantity

    const total_order_price = total_amount * 1.1

    const order = await Order.create({
      user_id,
      quantity,
      status_order: "Pending",
      date_order_placed: dateFormat,
      total_order_price 
    });

    await order.addItems(item, {
      through: {
        quantity: quantity,
        total_amount: total_amount,
      },
    });

    const response = new SuccessResponse(
      "Order created successfully",
      201,
      order
    );
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

async function orderSuccess(req, res, next) {
  try {
    const { order_id } = req.body;
    const updateOrder = await Order.findByPk(order_id);
    if (!updateOrder) {
      const response = new ErrorResponse("Order Not Found!", 404)
      return res.status(404).json(response);
    } else {
      updateOrder.date_order_paid = dateFormat
      updateOrder.status_order = "Success"

      await updateOrder.save();
      const response = new SuccessResponse("Order Update Success!", 200, updateOrder)
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
        through: { attributes: ["quantity", "total_amount"] },
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
