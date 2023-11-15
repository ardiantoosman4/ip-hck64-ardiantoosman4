'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Orders', 'snapToken', { type: Sequelize.STRING });
    await queryInterface.addColumn('Orders', 'order_id', { type: Sequelize.STRING });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Orders', 'snapToken', { /* query options */ });
    await queryInterface.removeColumn('Orders', 'order_id', { /* query options */ });
  }
};
