const { SecretVariables } = require('../constants/constants')

module.exports = {

     PORT: process.env.PORT || SecretVariables.PORT,
     DB_NAME: process.env.DB_NAME || SecretVariables.DB_NAME,
     DB_USER_NAME: process.env.DB_USER_NAME || SecretVariables.DB_USER_NAME,
     DB_USER_PASSWORD: process.env.DB_USER_PASSWORD || SecretVariables.DB_USER_PASSWORD

}