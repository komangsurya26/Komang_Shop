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
    }
  }
  Items.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    stock: DataTypes.INTEGER,
    color: DataTypes.STRING,
    size: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Items',
  });
  return Items;
};