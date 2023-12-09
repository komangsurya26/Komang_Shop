"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders_Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Orders_Items.belongsTo(models.Items, {
        foreignKey: "idItem",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Orders_Items.init(
    {
      idOrder: DataTypes.INTEGER,
      idItem: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      color: DataTypes.STRING,
      size: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Orders_Items",
    }
  );
  return Orders_Items;
};
