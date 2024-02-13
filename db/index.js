const { Sequelize } = require('sequelize')
const config = require('../config/config')

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER_NAME, config.DB_USER_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    // logging: false  // for block query logs
})

//mysql
// const sequelize = new Sequelize('users', 'root', '1506', {
//   host: 'localhost',
//   dialect: 'mysql',
// });

module.exports = sequelize
