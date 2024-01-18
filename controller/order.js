const { Order, Items } = require("../models");
const { getFormattedDate } = require("../utils/date");
const dateFormat = getFormattedDate()

async function createOrder(req, res, next) {
  try {
    const user_id = req.user.id;
    const { item_id, quantity } = req.body;

    if (!item_id || !quantity || quantity <= 0) {
      return res.status(400).json({
        status: 400,
        message: "Invalid input. Please provide valid item_id and quantity.",
      });
    }

    // Dapatkan item dari tabel Items
    const item = await Items.findByPk(item_id);
    if (!item) {
      return res.status(404).json({
        status: 404,
        message: "Item not found"
      });
    }

    // Hitung total_amount
    const total_amount = item.item_price * quantity;

    // Hitung total_order_price (total_amount + 10%)
    const total_order_price = total_amount * 1.1;

    // Buat order
    const newOrder = await Order.create({
      user_id,
      status_order: "Pending",
      date_order_placed: dateFormat,
      total_order_price,
    });

    // Tambahkan item ke order dengan kuantitas dan total_amount
    await newOrder.addItems(item, {
      through: { quantity, total_amount },
    });

    const order = await newOrder.getItems()

    res.status(201).json({
      status: 201,
      message: "Order created successfully",
      Order: newOrder,
      Order_Detail: order
    });
  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res, next) {
  try {
    const { order_id } = req.body;
    const updateOrder = await Order.findByPk(order_id);
    if (!updateOrder) {
      return res.status(404).json({
        status: 404,
        message: "ORDER NOT FOUND",
      });
    } else {
      updateOrder.date_order_paid = dateFormat
      updateOrder.status_order = "Success"

      await updateOrder.save();

      res.status(200).json({
        status: 200,
        message: "ORDER UPDATE SUCCESS!",
        data: updateOrder,
      });
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
      return res.status(404).json({
        status: 404,
        message: "Order not found",
      });
    }
    res.status(200).json({
      status: 200,
      Order: order,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { createOrder, updateOrder, getOrderDetails };
