const express = require('express');
const router = express.Router();
const { Danhgisanpham } = require('../../controller/APIcontroller');


const init_API_Danhgisanpham = (app) => {
    router.post('/Danhgia',Danhgisanpham);
    app.use('/api/v1/', router);
}
module.exports = init_API_Danhgisanpham;