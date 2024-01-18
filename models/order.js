"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsToMany(models.Items, {
        through: models.Order_Items,
        foreignKey: "order_id"
      })
    }
  }
  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        references: {
          model: "Users",
          key: "id",
        },
        type: DataTypes.INTEGER,
      },
      total_order_price: DataTypes.DECIMAL,
      status_order: DataTypes.STRING,
      date_order_placed: DataTypes.STRING,
      date_order_paid: DataTypes.STRING,
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
