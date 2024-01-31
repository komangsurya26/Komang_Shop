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
      user_id: {
        references: {
          model: "Users",
          key: "id",
        },
        type: DataTypes.INTEGER,
        onDelete: "CASCADE", //jika pk user di tabel user dihapus maka user_id di tabel ini juga dihapus/bercermin
        onUpdate: "CASCADE", //jika pk user di tabel user diubah maka user_id di tabel ini juga berubah/bercermin
      },
      address: DataTypes.STRING,
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