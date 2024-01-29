'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Items.belongsToMany(models.Order,{
        through: models.Order_Items,
        foreignKey: "item_id",
        as: "order_items"
      })
    }
  }
  Items.init(
    {
      item_name: DataTypes.STRING,
      item_image: DataTypes.STRING,
      item_description: DataTypes.TEXT,
      item_stock: DataTypes.INTEGER,
      item_price: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Items",
    }
  );
  return Items;
};