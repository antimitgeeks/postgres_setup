//postgres sql;
const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('demo', 'postgres', 'root', {
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
