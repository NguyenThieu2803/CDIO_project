const express = require('express');
const router = express.Router();
const { GetHomepage,GetgioithieuPage,GetHoiDap,CreateRecipe,FavoristListPage } = require('../controller/Homecontroller');
const { Danhgisanpham } = require('../controller/APIcontroller');


 
router.route('/').get(GetHomepage)
router.route('/Gioithieu').get(GetgioithieuPage)
router.route('/HoiDap').get(GetHoiDap)
router.route('/create-recipe').post(CreateRecipe)
router.route('/FavoristListPage').get(FavoristListPage)

module.exports = router;