'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Marker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Marker.init({
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Marker',
  });
  return Marker;
};