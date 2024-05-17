const express = require('express');
const router = express.Router();
const { GetAllReviews,GetAllIngredient,GetAllinstruction } = require('../../controller/APIcontroller');



const init_API_Intruction = (app) => {
    router.get('/Instruction/:id',GetAllinstruction);
    app.use('/api/v1/', router);
}
module.exports = init_API_Intruction;