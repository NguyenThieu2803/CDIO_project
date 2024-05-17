const express = require('express');
const router = express.Router();
const { GetHomepage,GetgioithieuPage,GetHoiDap } = require('../controller/Homecontroller');

 
router.route('/').get(GetHomepage)
router.route('/Gioithieu').get(GetgioithieuPage)

router.route('/HoiDap').get(GetHoiDap)

module.exports = router;