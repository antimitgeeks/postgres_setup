const { Employee } = require('../model/user')
const genPassword = require('../lib/passwordUtils').genPassword
const { Company } = require('../model/company')

// create new user entry in DB 
exports.createUser = async (userDetails) => {
     // method for generate hash password
     var saltHash = genPassword(userDetails.password)
     var salt = saltHash.salt
     var hash = saltHash.hash
     // added hash and salt for new user
     userDetails.hash = hash;
     userDetails.salt = salt;
     await Employee.create(userDetails)
     return true;
}

// get all list
exports.findList = async () => {
     let list = await Employee.findAll({
          include: [{
               model: Company,
          },],
          attributes: { exclude: ['hash', 'salt'] }
     });
     return list;
}

// get by id 
exports.fineById = async (id) => {
     const user = await Employee.findOne({
          where: { id: id },
          attributes: { exclude: ['hash', 'salt'] }
     })
     return user;
}

// update user by id 
exports.updateById = async (id, details) => {
     const result = await Employee.update(details, {
          where: { id: id },
          returning: true,
     });
     return result;
}

// delete by id 
exports.deleteById = async (id) => {
     await Employee.destroy({ where: { id: id } });
     return true;
}