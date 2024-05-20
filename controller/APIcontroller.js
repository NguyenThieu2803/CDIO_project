
const { sequelize_sqlserver } = require('../config/Sequelize');
const express = require('express');
const Recipe = require('../model/RECIPE');
const Dish = require('../model/DISH');
const Category = require('../model/CATEGORY');
const Instructor = require('../model/INSTRUCTOR');
const Ingredient = require('../model/INGREDIENT');
const Review = require('../model/REVIEW');
const Distributor = require('../model/DISTRIBUTOR');
const FavoristList = require('../model/FAVORISTLIST');

const { GetAllreviewdata, GetIngredient, GetAllInstruction, GetAllRecipeByDifficulty, Getdatadifficult, DataEvent, DataRecipeByid } = require('../service/GetAlldata');
const { defineAssociation, } = require('../config/associations');
const { Danhgia,addFavorite } = require('../service/CRUD');

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
      if (isNaN(req.params.id)) {
         return res.status(400).json({ message: "Invalid ID parameter" });
      }
      const data = await GetAllreviewdata(req.params.id);

      res.status(201).json({ data });
   } catch (error) {
      console.error("Error in GetAllReviews:", error);
      res.status(500).json({ message: "Internal server error" });
   }
};


const GetAllIngredient = async (req, res) => {
   try {
      console.log(req.params.id)
      const data = await GetIngredient(req.params.id);
      res.status(201).json({ data });
   } catch (error) {
      console.error("Error in GetAllIngredient:", error);
      res.status(500).json({ message: "Internal server error" });
   }
}
const GetAllinstruction = async (req, res) => {
   try {
      console.log(req.params.id)
      const data = await GetAllInstruction(req.params.id);
      res.status(201).json({ data });
   } catch (error) {
      console.error("Error in GetAllReviews:", error);
      res.status(500).json({ message: "Internal server error" });
   }
}


const GetFilteBydifficulty = async (req, res) => {
   try {
      const { difficulty, event } = req.query;
      const data = await GetAllRecipeByDifficulty(difficulty === undefined ? null : difficulty, event === undefined ? null : event);
      res.status(201).json({ data });
   } catch (error) {
      console.error(error)
   }
}
const Getdifficult = async (req, res) => {
   try {
      const data = await Getdatadifficult();
      res.status(201).json({ data });
   } catch (error) {
      console.error(error)
   }

}

const GetDataEvent = async (req, res) => {
   try {
      const data = await DataEvent();
      res.status(201).json({ data });
   } catch (error) {
      console.log(error);
   }

}


const Danhgisanpham = async (req, res) => {
   try {
      const { rate, comment, recipeId, username, userImg } = req.body;
      console.log(rate, comment);
      const newReview = await Danhgia(rate, comment, recipeId, username, userImg);
      res.json({ message: 'Review submitted successfully!', review: newReview });
   } catch (error) {
      console.error(error)
   }
}


const GetdatarecipeById = async (req, res) => {
   try {
      const id = req.params.id;
      console.log(id);
      const recipeId = await DataRecipeByid(id);
      res.status(201).json({ recipeId });
   } catch (error) {
      console.log(error);
   }
}


const AddFavorite = async (req, res) => {
   try {
      const {RECIPE_NAME,IMG_URL,DESCRIPTION,EVENT,RECIPE_ID} =req.body;
   console.log(RECIPE_NAME,IMG_URL,DESCRIPTION,EVENT,RECIPE_ID);
   const newFavorite = await addFavorite(RECIPE_NAME,IMG_URL,DESCRIPTION,EVENT,RECIPE_ID);
   res.json({ message: 'AddFavorist submitted successfully!', FavoristList: newFavorite });
   } catch (error) {
      console.log(error)
   }
}

const dataFavoristList = async (req, res) =>
   {
      const data= await FavoristList.findAll({});
      return data

   }
module.exports = {
   GetAllRecipe, GetAllReviews, GetAllIngredient, GetAllinstruction, GetFilteBydifficulty, Getdifficult, GetDataEvent, Danhgisanpham,GetdatarecipeById,AddFavorite,dataFavoristList
}