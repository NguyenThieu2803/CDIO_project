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


const GetAllreviewdata=async (Id)=>{
    const data = await Review.findAll({
        where:{
            RECIPE_ID:Id
        },
        include:[{
            model:Recipe,
            attributes:['IMG_URL','DESCRIPTION'],
            where: {
                RECIPE_ID:Id
            }
        }]
    })
    return data;
}


const GetIngredient = (Id) =>{
      const data = Ingredient.findAll({
        where:{
            RECIPE_ID:Id
        },
    })
    return data;
}

const GetAllInstruction = (Id) =>{
    const data = Instructor.findAll({
        where:{
            RECIPE_ID:Id
        },
    })
    return data;
}


module.exports={
    GetAllreviewdata,GetIngredient,GetAllInstruction
}