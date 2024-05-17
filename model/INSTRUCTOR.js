const { sequelize_sqlserver } = require('../config/Sequelize');
const { DataTypes } = require('sequelize');

const Instructor = sequelize_sqlserver.define('INSTRUCTION', {
  INSTRUCTION_ID: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    STEP_NUMER: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    STEP_DESCRIPTION: {
      type: DataTypes.STRING,
      allowNull: false
    },
    RECIPE_ID: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'INSTRUCTION',
    timestamps: false
  });

  module.exports = Instructor;