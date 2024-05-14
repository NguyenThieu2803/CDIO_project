require('dotenv').config({ path: '../../.env' });
const { Sequelize } = require('sequelize');


//config of sql server
const SQLSERVER_NAME = process.env.DATABASE_SQLSERVER;
const SQLSERVER_USER = process.env.USER_SQLSERVER;
const SQLSERVER_PASSWORD = process.env.PASSWORD_SQLSERVER;
const SQLSERVER_HOST = process.env.HOST_SQLSERVER;
const SQLSERVER_PORT = process.env.PORT_SQLSERVER;

console.log(SQLSERVER_NAME,SQLSERVER_USER,SQLSERVER_PASSWORD,SQLSERVER_HOST,SQLSERVER_PORT)
const sequelize_sqlserver = new Sequelize(SQLSERVER_NAME, SQLSERVER_USER, SQLSERVER_PASSWORD, {
    host: SQLSERVER_HOST,
    dialect: 'mssql',
    port: Number(SQLSERVER_PORT),
    define: {
        timestamps: false
    }
});



module.exports = {sequelize_sqlserver }