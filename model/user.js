const { DataTypes } = require('sequelize')
const sequelize = require('../config/config')

const Employee = sequelize.define(
     'Employee',
     {
          id: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               autoIncrement: true,
          },
          email: {
               type: DataTypes.STRING,
               allowNull: true,
          },
          username: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          isadmin: {
               type: DataTypes.INTEGER,
               allowNull: false,
               defaultValue: 0,
          },
          hash: {
               type: DataTypes.STRING,
               allowNull: true,
          },
          salt: {
               type: DataTypes.STRING,
               allowNull: true,
          },
          transport_id: {   //this is for the one  to one ratlioship on the employee to transport 
               type: DataTypes.INTEGER,
               allowNull: true,
          },
          user_image: {
               type: DataTypes.TEXT,
               allowNull: true,
          },
          user_image_id: {
               type: DataTypes.INTEGER,
               allowNull: true
          }

     },
     {
          hooks: {
               beforeSave: async (employee, options) => {
                    const existingCount = await Employee.count();
                    if (existingCount === 0) {
                         employee.username = employee.username.toUpperCase();
                    }
               }
          },
     },
)

module.exports = { Employee }
