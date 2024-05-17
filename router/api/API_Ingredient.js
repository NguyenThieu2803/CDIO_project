const express = require('express');
const router = express.Router();
const { GetAllReviews,GetAllIngredient } = require('../../controller/APIcontroller');


const init_API_Ingredient = (app) => {
    router.get('/Ingredient/:id',GetAllIngredient);
    app.use('/api/v1/', router);
}
module.exports = init_API_Ingredient;