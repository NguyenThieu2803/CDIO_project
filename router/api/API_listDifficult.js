const express = require('express');
const router = express.Router();
const { Getdifficult } = require('../../controller/APIcontroller');


const init_API_datadifficult = (app) => {
    router.get('/datadifficulty',Getdifficult);
    app.use('/api/v1/', router);
}
module.exports = init_API_datadifficult;