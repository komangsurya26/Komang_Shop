const { Items } = require("../models");

async function createItem(req, res, next) {
  try {
    const {
      item_name,
      item_price,
      item_image,
      item_description,
      item_stock,
      item_color,
      item_size,
    } = req.body;
    if (!item_name || !item_price || !item_image) {
      res.status(400).json({
        status: 400,
        message: "INPUT SETIDAKNYA NAME,PRICE,IMAGE!!",
      });
    } else {
      const createdItem = await Items.create({
        item_name,
        item_price,
        item_image,
        item_size,
        item_stock,
        item_description,
        item_color,
      });
      res.status(201).json({
        status: 201,
        message: "CREATE ITEM SUCCESS!",
        item: createdItem,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function updateItem(req, res, next) {
  try {
    const { id } = req.params;
    const data = await Items.findOne({
      where: {
        id,
      },
    });
    if (!data) {
      res.status(404).json({
        status: 404,
        message: "DATA NOT FOUND!",
      });
    }
    const {
      item_name,
      item_price,
      item_image,
      item_description,
      item_stock,
      item_color,
      item_size,
    } = req.body;
    data.item_name = item_name || data.item_name;
    data.item_price = item_price || data.item_price;
    data.item_image = item_image || data.item_image;
    data.item_description = item_description || data.item_description;
    data.item_stock = item_stock || data.item_stock;
    data.item_color = item_color || data.item_color;
    data.item_size = item_size || data.item_size;

    await data.save();

    res.status(200).json({
      status: 200,
      message: "ITEM UPDATE SUCCESS!",
      data: data,
    });
  } catch (error) {
    next(error);
  }
}

async function getItem(req, res, next) {
  try {
    const { id } = req.params;
    const item = await Items.findOne({
      where: {
        id,
      },
    });
    if (!item) {
      res.status(404).json({
        status: 404,
        message: "DATA NOT FOUND!",
      });
    }
    res.status(200).json({
      status: 200,
      data: item,
    });
  } catch (error) {
    next(error);
  }
}

async function getAllItem(req, res, next) {
  try {
    const data = await Items.findAll();
    res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteItem(req, res, next) {
  try {
    const { id } = req.params;
    const item = await Items.findOne({
      where: {
        id,
      },
    });
    if (!item) {
      return res.status(404).json({
        status: 404,
        message: "ITEM NOT FOUND or ALREADY DELETED.",
      });
    }
    await item.destroy();
    res.status(200).json({
      status: 200,
      message: "DELETE SUCCESS!",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { createItem, updateItem, getItem, getAllItem, deleteItem };
