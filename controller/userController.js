const { sendSuccess, sendError } = require('../utils/responseHandler')
const winston = require('../config/logger')
const userService = require('../services/userServices')
const codeStatus = require('../constants/statusCode')
const { ErrorMessage } = require('../constants/constants')


//create user
exports.addUser = async (req, res) => {
     try {
          const userDetails = req.body
          await userService.createUser(userDetails);
          sendSuccess(res, 'User Created.');
     } catch (error) {
          console.log(error)
          // below argument only takes string we cannot pass direct the error so we have to send in backticks
          winston.log('info', `${req.url} ${error.message}`)
          sendError(res, 500, ErrorMessage.INTERNAL_SERVER_ERROR)
     }
}

//get all users
exports.getAllUsers = async (req, res) => {
     try {
          const list = await userService.findList();
          sendSuccess(res, list)
     } catch (error) {
          console.log(error)
          winston.log('info', `${req.url} ${error.message}`)
          sendError(res, codeStatus.NOT_FOUND, ErrorMessage.INTERNAL_SERVER_ERROR)
     }
}

//get single user --with the image url that is associated with it 
exports.getOneUser = async (req, res) => {
     try {
          let id = req.params.id;
          const details = await userService.fineById(id);
          if (!details) {
               winston.log('info', `${req.url} User not found`)
               return sendError(res, codeStatus.NOT_FOUND, 'user not found')
          }
          sendSuccess(res, details)
     } catch (error) {
          winston.log('info', `${req.url} ${error.message}`)
          console.log(error)
          sendError(res, 500, ErrorMessage.INTERNAL_SERVER_ERROR)
     }
}

//update user
exports.updateUser = async (req, res) => {
     try {
          let id = req.params.id;
          let details = req.body;
          const existingUser = await userService.fineById(id);
          if (!existingUser) {
               winston.log('info', `${req.url} User not found`)
               return sendError(res, 404, 'user not found ')
          }

          await userService.updateById(id, details);
          sendSuccess(res, 'Update Success.')
     } catch (error) {
          console.log(error);
          winston.log('info', `${req.url} ${error.message}`)
          sendError(res, 500, 'Internal server error ')
     }
}

//delete user by id
exports.deleteUser = async (req, res) => {
     try {
          let id = req.params.id;
          const existingUser = await userService.fineById(id);
          if (!existingUser) {
               return sendError(res, 404, 'user not found ')
          }
          await userService.deleteById(id);
          sendSuccess(res, 'User Deleted.');
     } catch (error) {
          winston.log('info', `${req.url} ${error.message}`);
          sendError(res, 500, 'Internal Server Error');
     }
};

exports.login = async (req, res) => {
     try {
          const details = req.session.passport.user;
          delete details.hash
          delete details.salt
          sendSuccess(res, details)
     } catch (error) {
          console.log(error)
          winston.log('info', `${req.url} ${error.message}`)
          sendError(res, 404, 'Error getting all  user:')
     }
};
