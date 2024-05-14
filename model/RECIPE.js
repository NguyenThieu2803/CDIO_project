
const { sequelize_sqlserver } = require('../config/Sequelize');
const { DataTypes } = require('sequelize');

const Recipe = sequelize_sqlserver.define('RECIPE', {
    RECIPE_ID: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    DISH_ID: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    CATEGORY_ID: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    RECIPE_NAME: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    DESCRIPTION: {
      type: DataTypes.STRING,
      allowNull: false
    },
    PREP_TIME: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    COOK_TIME: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SERVINGS: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    IMG_URL: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    INSTRUCTION_ID: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    INGREDIENT_ID: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    EVENT: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DIFFICULTY_LEVEL: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    REVIEW_ID: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'RECIPE',
    timestamps: false
  });
  


module.exports = Recipe
  // Define associations if necessary

  