const express = require('express');
const router = express.Router();
const { GetdatarecipeById } = require('../../controller/APIcontroller');


const init_API_RecipeByid = (app) => {
    router.get('/RecipeByid/:id',GetdatarecipeById);
    app.use('/api/v1/', router);
}
module.exports = init_API_RecipeByid;