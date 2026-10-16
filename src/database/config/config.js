const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../../.env.dev') })

const globalConstants = require('../../const/globalConstants')

module.exports = {
    "development": {
        "username": globalConstants.DB_USERNAME,
        "password": globalConstants.DB_PASSWORD,
        "database": globalConstants.DB_NAME,
        "host": globalConstants.DB_HOST,
        "port": globalConstants.DB_PORT,
        "dialect": "postgres",
        "logging": false
    }
}