const express = require('express');
const router = express.Router();
const { GetHomepage } = require('../controller/Homecontroller');

 
router.route('/').get(GetHomepage)

module.exports = router;