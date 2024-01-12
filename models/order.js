'use strict';
const { types } = require('pg');
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    idUser: DataTypes.INTEGER,
    idItem: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    color: DataTypes.STRING,
    size: DataTypes.STRING,
    order_price: DataTypes.DECIMAL,
    payment_method: DataTypes.STRING,
    date_order_placed: DataTypes.STRING,
    date_order_paid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};