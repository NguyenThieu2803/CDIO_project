
const { sequelize_sqlserver } = require('../config/Sequelize');
const { DataTypes } = require('sequelize');

const Dish = sequelize_sqlserver.define('DISH', {
  DISH_ID: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    NAME: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    DISTRIBUTOR_ID: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'DISH',
    timestamps: false
  });
  
  module.exports = Dish;