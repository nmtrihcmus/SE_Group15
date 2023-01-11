const express = require("express");
const route = express.Router();
const loginC = require('../controllers/login.c');

route.get('/', loginC.loginPage);
route.post('/', loginC.login);


module.exports = route;