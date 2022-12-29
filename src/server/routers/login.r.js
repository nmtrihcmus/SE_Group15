const express = require("express");
const route = express.Router();
const loginC = require('../controllers/login.c');
const passport = require('passport');

route.get('/', loginC.interface);
route.post('/',passport.authenticate('local'), loginC.login);

module.exports = route;