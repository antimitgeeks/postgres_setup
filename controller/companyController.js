const { Company } = require('../model/company')
const { Employee } = require('../model/user')
const { sendSuccess, sendError } = require('../utils/responseHandler')
const winston = require('../config/logger')

const addCompany = async (req, res) => {
     try {
          const company = {
               name: req.body.name,
          }
          // console.log(req.body.);
          const companyName = await Company.create(company)
          sendSuccess(res, companyName)
     } catch (error) {
          console.log(error)
          // below argument only takes string we cannot pass direct the error so we have to send in backticks
          winston.log('info', `${req.url} ${error.message}`)
          sendError(res, 500, 'Error creating company:')
     }
}

const getAllCompany = async (req, res) => {
     try {
          let company = await Company.findAll({
               include: [
                    {
                         model: Employee,
                         required: false,
                         attributes: { exclude: ['hash', 'salt'] }
                    }
               ],
          })
          sendSuccess(res, company)
     } catch (error) {
          console.log(error)
          winston.log('info', `${req.url} ${error.message}`)
          sendError(res, 404, 'Error getting all  Company:')
     }
}

const getCompany = async (req, res) => {
     try {
          let id = req.params.id
          let company = await Company.findOne({ where: { id: id } })
          sendSuccess(res, company)
     } catch (error) {
          console.log(error)
          winston.log('info', `${req.url} ${error.message}`)
          sendError(res, 404, `Company not exist with id ${id}`)
     }
}

module.exports = {
     addCompany,
     getAllCompany,
     getCompany,
}
