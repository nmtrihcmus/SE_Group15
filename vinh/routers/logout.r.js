const express = require("express");
const route = express.Router();

const logoutC = require('../controllers/logout.c');

route.get('/', logoutC.logout);

module.exports = route;