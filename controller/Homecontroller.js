
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


//get data homepage
const GetHomepage = async (req, res) => {
 res.render('PageHome.ejs');
      
}

const GetgioithieuPage = async (req,res)=>{
   res.render('GioiThieu.ejs');
}

const GetHoiDap = async (req,res)=>{
   res.render('HoiDap.ejs');
}

module.exports = {
   GetHomepage,GetgioithieuPage,GetHoiDap
}

