const { DataTypes } = require('sequelize')
const sequelize = require('../config/config')
const { Employee } = require('./user')

const Company = sequelize.define(
     'Company',
     {
          name: {
               type: DataTypes.STRING,
               allowNull: false,
          },
     },
     {

     },
)

Company.hasMany(Employee)
Employee.belongsTo(Company)

module.exports = { Company }
