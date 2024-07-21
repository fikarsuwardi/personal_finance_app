'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Transactions', 'type', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'income',
    });
    await queryInterface.addColumn('Transactions', 'date', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Transactions', 'type');
    await queryInterface.removeColumn('Transactions', 'date');
  }
};
