const { sequelize_sqlserver } = require('../config/Sequelize');
const { DataTypes } = require('sequelize');


const FavoristList = sequelize_sqlserver.define('FavoristList', {
    RECIPE_NAME: {
      type: DataTypes.STRING(255),
      primaryKey: true
    },
    IMG_URL: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    DESCRIPTION: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    EVENT: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    FAVORIST_ID: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    RECIPE_ID: {
      type: DataTypes.SMALLINT,
      allowNull: false
    }
  }, {
    tableName: 'FAVORIST_LIST',
    timestamps: false
  });
  
  module.exports=FavoristList;