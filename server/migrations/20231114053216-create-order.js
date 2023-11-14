"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      orderTime: {
        type: Sequelize.DATE,
      },
      paymentStatus: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      imgUrl: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
      },
      duration: {
        type: Sequelize.INTEGER,
      },
      trailerUrl: {
        type: Sequelize.TEXT,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
