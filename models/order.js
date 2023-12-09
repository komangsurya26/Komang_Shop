'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Orders.hasMany(models.Orders_Items, {
        foreignKey:"idOrder",
        as:"order_details",
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      })
    }
  }
  Orders.init({
    idUser: DataTypes.INTEGER,
    order_price: DataTypes.DECIMAL,
    payment_method: DataTypes.STRING,
    date_order_placed: DataTypes.STRING,
    date_order_paid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Orders',
    timestamps: false
  });
  return Orders;
};