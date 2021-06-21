'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('markers', 'latitude', {
        type: Sequelize.DECIMAL(9, 6)
      }),
      queryInterface.changeColumn('markers', 'longitude', {
        type: Sequelize.DECIMAL(9, 6)
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.changeColumn('markers', 'latitude')], [queryInterface.changeColumn('markers', 'longitude')]);
  },
};
