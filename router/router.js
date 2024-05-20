const express = require('express');
const router = express.Router();
const { GetHomepage,GetgioithieuPage,GetHoiDap,CreateRecipe,GetLogin} = require('../controller/Homecontroller');

 
router.route('/').get(GetHomepage)
router.route('/Gioithieu').get(GetgioithieuPage)
router.route('/Login').get(GetLogin)
router.route('/HoiDap').get(GetHoiDap)
router.route('/create-recipe').post(CreateRecipe)

module.exports = router;