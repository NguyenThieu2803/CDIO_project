const express = require('express');
const router = express.Router();
const { GetAllRecipe } = require('../../controller/APIcontroller');


const init_API_Rank = (app) => {
    router.get('/Rank', GetAllRecipe);
    app.use('/api/v1/', router);
}

module.exports = init_API_Rank