const { sequelize_sqlserver } = require('../config/Sequelize');
const { DataTypes } = require('sequelize');


const Distributor = sequelize_sqlserver.define('Distributor', {
  DISTRIBUTOR_ID: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    MEAN_NAME: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ADDRESS: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    WEBSITE_ADDRESS: {
      type: DataTypes.STRING,
      allowNull: false
    },
    PHONE_NUMBER: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'DISTRIBUTOR',
    timestamps: false
  });
  
  module.exports=Distributor;