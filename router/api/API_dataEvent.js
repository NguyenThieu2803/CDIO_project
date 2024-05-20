const express = require('express');
const router = express.Router();
const { GetDataEvent } = require('../../controller/APIcontroller');


const init_API_dataEvent = (app) => {
    router.get('/dataEvent',GetDataEvent);
    app.use('/api/v1/', router);
}
module.exports = init_API_dataEvent;