const express = require('express');
const router = express.Router();
const { GetAllReviews,GetFilteBydifficulty } = require('../../controller/APIcontroller');


const init_API_FilterBydif = (app) => {
    router.get('/filterBydifficulty/',GetFilteBydifficulty);
    app.use('/api/v1/', router);
}
module.exports = init_API_FilterBydif;