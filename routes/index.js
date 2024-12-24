const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
const config = require('../config/config.json');

/* GET home page. */
router.get('/', function (req, res, next) {
    try {
        res.json({
            status: 1,
            message: `Welcome to POS & Inventory System by andimags.`
        })
    }
    catch (err) {
        res.json({
            status: 0,
            message: `Something went wrong: ${err.message}`
        })
    }
});

router.get('/health-check', async function (req, res, next) {
    try {
        const env = process.env.ENVIRONMENT;
        const dbConfig = config[env];
        
        const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
            host: 'localhost',
            dialect: 'mysql'
          });

        await sequelize.authenticate();

        res.json({
            status: 1,
            message: `Connection has been established successfully.`
        })
    }
    catch (err) {
        res.json({
            status: 0,
            message: `Something went wrong: ${err.message}`
        })
    }
});

module.exports = router;
