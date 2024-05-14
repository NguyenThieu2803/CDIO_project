const { sequelize_sqlserver } = require('../config/Sequelize');
const { DataTypes } = require('sequelize');

const Instructor = sequelize_sqlserver.define('INSTRUCTOR', {
  INSTRUCTION_ID: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    STEP_NUMBER: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    STEP_DESCRIPTION: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'INSTRUCTOR',
    timestamps: false
  });

  module.exports = Instructor;