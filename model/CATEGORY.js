const { sequelize_sqlserver } = require('../config/Sequelize');
const { DataTypes } = require('sequelize');

const Category = sequelize_sqlserver.define('CATEGORY', {
    CATEGORY_ID: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    NAME: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'CATEGORY',
    timestamps: false
  });
  module.exports = Category;