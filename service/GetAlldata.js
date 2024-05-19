const { sequelize_sqlserver } = require('../config/Sequelize');
const express = require('express');
const Recipe = require('../model/RECIPE');
const Dish = require('../model/DISH');
const Category = require('../model/CATEGORY');
const Instructor = require('../model/INSTRUCTOR');
const Ingredient = require('../model/INGREDIENT');
const Review = require('../model/REVIEW');
const Distributor = require('../model/DISTRIBUTOR');


const { defineAssociation, } = require('../config/associations');


defineAssociation();


const GetAllreviewdata = async (Id) => {
    const data = await Review.findAll({
        where: {
            RECIPE_ID: Id
        },
        include: [{
            model: Recipe,
            attributes: ['IMG_URL', 'DESCRIPTION'],
            where: {
                RECIPE_ID: Id
            }
        }]
    })
    return data;
}


const GetIngredient = (Id) => {
    const data = Ingredient.findAll({
        where: {
            RECIPE_ID: Id
        },
    })
    return data;
}

const GetAllInstruction = (Id) => {
    const data = Instructor.findAll({
        where: {
            RECIPE_ID: Id
        },
    })
    return data;
}

const GetAllRecipeByDifficulty = async (difficulty, event) => {

    const recipe = await Recipe.findAll({
        where: {
            DIFFICULTY_LEVEL: difficulty,
            EVENT: event
        }
    })
    return recipe;
}

const Getdatadifficult = async () => {
    const difficulty = await Recipe.findAll({
        attributes: [sequelize_sqlserver.fn('DISTINCT', sequelize_sqlserver.col('DIFFICULTY_LEVEL')), 'DIFFICULTY_LEVEL']
    })
    return difficulty;
}

const GetDataEvent = async () => {
    const event = await Recipe.findAll({
        attributes: [sequelize_sqlserver.fn('DISTINCT', sequelize_sqlserver.col('EVENT')), 'EVENT']
    })
    return event;
}

module.exports = {
    GetAllreviewdata, GetIngredient, GetAllInstruction, GetAllRecipeByDifficulty, Getdatadifficult,GetDataEvent
}