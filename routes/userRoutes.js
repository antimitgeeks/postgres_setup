const express = require('express')
const router = express.Router()
const controller = require('../controller/userController')
const { auth, isadmin } = require('../middleware/userAuth')
const passport = require('passport')
const { verifyToken } = require('../middleware/userAuth')
const validation = require('../validations/user.validation')

// 1. create user
router.post('/users', validation.registerValidation, controller.addUser)
// 2. get all users
router.get('/users', controller.getAllUsers)
// 3. get single user
router.get("/users/:id", controller.getOneUser)
// 4. update user
router.put('/users/:id', controller.updateUser)
// 5. delete user by id
router.delete('/users/:id', controller.deleteUser)
//6 .login
router.post('/users/login', passport.authenticate('local'), controller.login)

module.exports = router
