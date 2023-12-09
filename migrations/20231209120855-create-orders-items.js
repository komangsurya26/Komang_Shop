'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders_Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idOrder: {
        type: Sequelize.INTEGER,
        references: {
          model: "Orders",
          key: "id",
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      idItem: {
        type: Sequelize.INTEGER,
        references: {
          model: "Items",
          key: "id",
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      qty: {
        type: Sequelize.INTEGER
      },
      color: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders_Items');
  }
};