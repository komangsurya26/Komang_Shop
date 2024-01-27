const { SuccessResponse, ErrorResponse } = require("../utils/respons");
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
      const response = new ErrorResponse("Input Name, Price and Image 🙏", 400);
      res.status(400).json(response);
    }
    const createdItems = await Items.create({
      item_name,
      item_price,
      item_image,
      item_size,
      item_stock,
      item_description,
      item_color,
    });
    const response = new SuccessResponse(
      "CREATE ITEM SUCCESS!",
      201,
      createdItems
    );
    res.status(201).json(response)
  } catch (error) {
    next(error);
  }
}

async function updateItem(req, res, next) {
  try {
    const id  = +req.params.id;
    const {
      item_name,
      item_price,
      item_image,
      item_description,
      item_stock,
      item_color,
      item_size,
    } = req.body;
    const data = await Items.findOne({
      where: {
        id,
      },
    });
    if (!data) {
      const response = new ErrorResponse("DATA NOT FOUND!", 404);
      res.status(404).json(response);
    }
    data.item_name = item_name || data.item_name;
    data.item_price = item_price || data.item_price;
    data.item_image = item_image || data.item_image;
    data.item_description = item_description || data.item_description;
    data.item_stock = item_stock || data.item_stock;
    data.item_color = item_color || data.item_color;
    data.item_size = item_size || data.item_size;

    await data.save();

    const response = new SuccessResponse("ITEM UPDATE SUCCESS!", 200, data);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function getItem(req, res, next) {
  try {
    const id  = +req.params.id;
    const item = await Items.findOne({
      where: {
        id,
      },
    });
    if (!item) {
      const response = new ErrorResponse("DATA NOT FOUND!",404)
      res.status(404).json(response);
    }
    const response = new SuccessResponse("Get Item Success", 200, item);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function getAllItem(req, res, next) {
  try {
    const data = await Items.findAll();
    const response = new SuccessResponse("Get item all success", 200, data)
    res.status(200).json(response);
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
      const response = new ErrorResponse(
        "ITEM NOT FOUND or ALREADY DELETED.",
        404
      );
      return res.status(404).json(response)
    }
    res.status(200).json(new SuccessResponse("Delete Success", 200));
  } catch (error) {
    next(error);
  }
}

module.exports = { createItem, updateItem, getItem, getAllItem, deleteItem };
