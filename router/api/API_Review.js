const express = require('express');
const router = express.Router();
const { GetAllReviews } = require('../../controller/APIcontroller');


const init_API_Review = (app) => {
    router.get('/dataReview/:id',GetAllReviews);
    app.use('/api/v1/', router);
}
module.exports = init_API_Review;