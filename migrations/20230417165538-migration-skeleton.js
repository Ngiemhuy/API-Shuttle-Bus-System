'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('profiles','license_plate_no',{type:Sequelize.STRING,allowNull:false,defaultValue:"N/A"})
    await queryInterface.addColumn('profiles','bus_type',{type:Sequelize.STRING,allowNull:false,defaultValue:"N/A"})
    await queryInterface.addColumn('profiles','max_seats',{type:Sequelize.INTEGER,allowNull:false,defaultValue:0})
    await queryInterface.addColumn('profiles','year_experience',{type:Sequelize.INTEGER,allowNull:false,defaultValue:0})
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
