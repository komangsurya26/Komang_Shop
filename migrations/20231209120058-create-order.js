'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUser: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      order_price: {
        type: Sequelize.DECIMAL
      },
      payment_method: {
        type: Sequelize.STRING
      },
      date_order_placed: {
        type: Sequelize.STRING
      },
      date_order_paid: {
        type: Sequelize.STRING
      },
    }, {
      timestamps: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};