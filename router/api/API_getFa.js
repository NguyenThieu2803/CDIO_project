const express = require('express');
const router = express.Router();
const { dataFavoristList  } = require('../../controller/APIcontroller');


const init_API_Favorite = (app) => {
    router.get('/Favorite',dataFavoristList);
    app.use('/api/v1/', router);
}
module.exports = init_API_Favorite;