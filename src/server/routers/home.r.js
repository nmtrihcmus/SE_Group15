const express = require("express");
const route = express.Router();

const homeC = require('../controllers/home.c');

route.get("/", homeC.homePage);
route.get('/forgetPassword', homeC.forgetPassPage)

module.exports = route;