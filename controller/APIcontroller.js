
const { sequelize_sqlserver } = require('../config/Sequelize');
const express = require('express');
const Recipe = require('../model/RECIPE');
const Dish = require('../model/DISH');
const Category = require('../model/CATEGORY');
const Instructor = require('../model/INSTRUCTOR');
const Ingredient = require('../model/INGREDIENT');
const Review = require('../model/REVIEW');
const Distributor = require('../model/DISTRIBUTOR');

const {GetAllreviewdata}= require('../service/GetAllReviewdata');
const { defineAssociation, } = require('../config/associations');


defineAssociation();


//get data homepage
const GetAllRecipe = async (req, res) => {

      const data = await Recipe.findAll({});
      const recipes = await Recipe.findAll({
         attributes: [
            'RECIPE_ID',
            'RECIPE_NAME',
            [sequelize_sqlserver.fn('SUM', sequelize_sqlserver.col('Review.LIKE')), 'totalLikes']
         ],
         include: [
            {
               model: Review,
               attributes: []
            }
         ],
         group: ['Recipe.RECIPE_ID', 'Recipe.RECIPE_NAME'],
         order: [[sequelize_sqlserver.literal('totalLikes'), 'DESC']]
      });
      const sortedRecipes = recipes.sort((a, b) => b.totalLikes - a.totalLikes);

      sortedRecipes.map(recipe => ({
         RECIPE_ID: recipe.RECIPE_ID,
         RECIPE_NAME: recipe.RECIPE_NAME,
         totalLikes: recipe.dataValues.totalLikes
      }));

   res.status(201).json({ data, sortedRecipes })
}



const GetAllReviews = async (req, res) => {
   try {
      console.log(req.params.id)
       const data = await GetAllreviewdata(req.params.id);
       res.status(201).json({ data });
   } catch (error) {
       console.error("Error in GetAllReviews:", error);
       res.status(500).json({ message: "Internal server error" });
   }
};




module.exports ={
   GetAllRecipe,GetAllReviews
}