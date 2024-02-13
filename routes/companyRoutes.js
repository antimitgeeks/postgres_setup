const express = require('express')
const router = express.Router()
const CompanyController = require('../controller/companyController')

router.post('/add-company', CompanyController.addCompany)
router.get('/company-list', CompanyController.getAllCompany)
router.get('/company/:id', CompanyController.getCompany)

module.exports = router 
