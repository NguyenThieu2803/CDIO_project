const Recipe = require('../model/RECIPE');
const Dish = require('../model/DISH');
const Category = require('../model/CATEGORY');
const Instructor = require('../model/INSTRUCTOR');
const Ingredient = require('../model/INGREDIENT');
const Review = require('../model/REVIEW');
const Distributor= require('../model/DISTRIBUTOR');


const defineAssociation = () => {
    Recipe.belongsTo(Dish, { foreignKey: 'DISH_ID' });
    Recipe.belongsTo(Category, { foreignKey: 'CATEGORY_ID' });
    Recipe.belongsTo(Instructor, { foreignKey: 'INSTRUCTION_ID' });
    Recipe.belongsTo(Ingredient, { foreignKey: 'INGREDIENT_ID' });
    Recipe.belongsTo(Review, { foreignKey: 'REVIEW_ID' });
    Recipe.hasMany(Review, { foreignKey: 'RECIPE_ID'});  
    Dish.belongsTo(Distributor, { foreignKey: 'DISTRIBUTOR_ID' });
}

module.exports = {
    defineAssociation
}