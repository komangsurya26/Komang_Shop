const { Order, Items } = require("../models");

async function createOrder(req, res, next) {
  try {
    const idUser = req.user.id;
    const { idItem, qty, color, size, payment_method } = req.body;

    // Retrieve item details for calculating order price
    const itemDetails = await Items.findOne({
      where: {
        id: idItem,
      },
    });

    if (!itemDetails) {
      res.status(404).json({ 
        status: 404,
        message: "Id Item not found"})
    } else {
      const orderPrice = itemDetails.price * qty;

      const date = new Date();
      const dateFormat = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  
      const newOrder = await Order.create({
        idUser,
        idItem,
        qty,
        color,
        size,
        order_price: orderPrice,
        payment_method,
        date_order_placed: dateFormat,
      });
  
      res
        .status(201)
        .json({
          status: 201,
          message: "Order created successfully",
          dataOrder: [newOrder, itemDetails],
        });
    }
  } catch (error) {
    next(error);
  }
}

async function updateDateOrder (req,res,next) {
  try {
    const { id } = req.params
    const order = await Order.findOne({
      where: { id },
    });
    if (!order) {
      res.status(404).json({
        status: 404,
        message: "idOrder not found",
      });
    } else {
      const date = new Date();
      const dateFormat = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      order.date_order_paid = dateFormat || order.date_order_paid;

      await order.save();

      res.status(200).json({
        status: 200,
        message: "ORDER UPDATE SUCCESS!",
        data: order,
      });
    }
  } catch (error) {
    next(error);
  }
}
async function deleteAllOrder (req,res,next) {
  try {
    await Order.destroy({ where: {} });
    res.status(200).json({
      status: 200,
      message: "All Order has been delete",
    });
  } catch (error) {
    next(error);
  }
}


module.exports = { createOrder, updateDateOrder, deleteAllOrder };
