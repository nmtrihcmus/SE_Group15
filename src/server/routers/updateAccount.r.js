const express = require('express')
const route = express.Router()

const updateAccountC = require('../controllers/updateAccount.c')

route.get('/', updateAccountC.interface) 
route.post('/', updateAccountC.updateAccount)
route.post('/update', updateAccountC.interface)

module.exports = route;