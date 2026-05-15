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
     await queryInterface.addConstraint('flights', {

      type: 'FOREIGN KEY',

      name: 'departure_airport_fkey',

      fields: ['departureAirportId'],

      references: {
        table: 'airports',
        field: 'code'
      },

      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'

    });

    await queryInterface.addConstraint('flights', {

      type: 'FOREIGN KEY',

      name: 'arrival_airport_fkey',

      fields: ['arrivalAirportId'],

      references: {
        table: 'airports',
        field: 'code'
      },

      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'

    });
    
    await queryInterface.addConstraint('flights', {

      type: 'FOREIGN KEY',

      name: 'airplaneId_fkey',

      fields: ['airplaneId'],

      references: {
        table: 'airplanes',
        field: 'id'
      },

      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'

    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint(
      'flights',
      'departure_airport_fkey'
    );

    await queryInterface.removeConstraint(
      'flights',
      'arrival_airport_fkey'
    );
  }
};
