const { sequelize_sqlserver } = require('../config/Sequelize');
const { DataTypes } = require('sequelize');

const Ingredient = sequelize_sqlserver.define('INGREDIENT', {
  INGREDIENT_ID: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  NAME: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  UNIT: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  AMOUNT: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'INGREDIENT',
  timestamps: false
});

module.exports = Ingredient;