'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
    }
  }
  User_Details.init(
    {
      adress: DataTypes.STRING,
      city: DataTypes.STRING,
      postal_code: DataTypes.STRING,
      country_code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User_Details",
    }
  );
  return User_Details;
};