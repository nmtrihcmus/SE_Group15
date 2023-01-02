const express = require('express')
const route = express.Router()

const profileC = require('../controllers/profile.c')

route.get('/', profileC.profilePage);
route.post('/', profileC.updateProfile)

module.exports = route;