const { sequelize_sqlserver } = require('../config/Sequelize');
const { DataTypes } = require('sequelize');


const Review = sequelize_sqlserver.define('REVIEW', {
    REVIEW_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    USER_NAME: DataTypes.STRING,
    COMMENT: DataTypes.STRING,
    RATING: DataTypes.INTEGER,
    DATE: DataTypes.DATE,
    LIKE: DataTypes.INTEGER,
    RECIPE_ID: DataTypes.STRING(50),
    USER_IMG: DataTypes.STRING(50)
}, { sequelize_sqlserver, modelName: 'REVIEW', tableName: 'REVIEW' });



module.exports = Review