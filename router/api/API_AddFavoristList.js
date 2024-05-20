const express = require('express');
const router = express.Router();
const { AddFavorite  } = require('../../controller/APIcontroller');


const init_API_AddFavorite = (app) => {
    router.post('/AddFavorite',AddFavorite);
    app.use('/api/v1/', router);
}
module.exports = init_API_AddFavorite;