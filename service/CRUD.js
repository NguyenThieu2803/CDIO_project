const { sequelize_sqlserver } = require('../config/Sequelize');
const express = require('express');
const Recipe = require('../model/RECIPE');
const Dish = require('../model/DISH');
const Category = require('../model/CATEGORY');
const Instructor = require('../model/INSTRUCTOR');
const Ingredient = require('../model/INGREDIENT');
const Review = require('../model/REVIEW');
const Distributor = require('../model/DISTRIBUTOR');
const FavoristList = require('../model/FAVORISTLIST')

const { defineAssociation, } = require('../config/associations');
const { name } = require('ejs');


defineAssociation();




const Danhgia = async(rate, comment, recipeId, username, userImg)=>{
    try {
        const reviewCount = await Review.count();
        console.log(reviewCount);
        const newReviewId = reviewCount + 1;
    const data = await Review.create({
        REVIEW_ID: newReviewId,
            RATING: rate,
            COMMENT: comment,
            USER_NAME: username,
            RECIPE_ID: recipeId,
            USER_IMG: userImg,
            DATE: new Date()
    });
    return data;
    } catch (error) {
        console.error(error);
    }
}


const addFavorite = async (RECIPE_NAME,IMG_URL,DESCRIPTION,EVENT,RECIPE_ID ) =>{
    const FaCount = await FavoristList.count();
        console.log(FaCount);
        const newId = FaCount + 1;
        const data = await FavoristList.create({
            FAVORIST_ID: newId,
            RECIPE_NAME: RECIPE_NAME,
            IMG_URL: IMG_URL,
            DESCRIPTION: DESCRIPTION,
            EVENT: EVENT,
            RECIPE_ID:RECIPE_ID
        })
        return data;
}
module.exports = {
    Danhgia,addFavorite
}