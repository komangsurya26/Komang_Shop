const { Items } = require("../models");

async function createItem (req, res, next) {
  try {
    const { name, price, image, description, stock, color, size } = req.body;
    if (!name||!price||!image) {
        res.status(400).json({
            status: 400,
            message: "INPUT SETIDAKNYA NAME,PRICE,IMAGE!!"
        })
    } else {
        const createdItem = await Items.create({
            name,
            price,
            image,
            size,
            stock,
            description,
            color,
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

async function updateItem (req,res,next) {
    try {
        const {id} = req.params
        const data = await Items.findOne({
            where:{
                id
            }
        })
        if (!data) {
            res.status(404).json({
                status:404,
                message: 'DATA NOT FOUND!'
            })
        }
        const {name, price, image, description, stock, color, size} = req.body
        data.name = name || data.name
        data.price = price || data.price
        data.image = image || data.image
        data.description = description || data.description
        data.stock = stock || data.stock
        data.color = color || data.color
        data.size = size || data.size

        await data.save()

        res.status(200).json({
            status:200,
            message: 'ITEM UPDATE SUCCESS!',
            data: data
        })
    } catch (error) {
        next(error)
    }
}

async function getItem (req,res,next) {
    try {
        const {id} = req.params
        const item = await Items.findOne({
            where:{
                id
            }
        })
        if (!item) {
            res.status(404).json({
                status:404,
                message: 'DATA NOT FOUND!'
            })
        }
        res.status(200).json({
            status:200,
            data: item
        })
    } catch (error) {
        next(error)
    }
}

async function getAllItem (req,res,next) {
    try {
        const data = await Items.findAll()
        res.status(200).json({
            status: 200,
            data: data
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { createItem, updateItem, getItem, getAllItem };
