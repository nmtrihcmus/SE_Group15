const express = require("express");
const route = express.Router();

const homeC = require('../controllers/home.c');

route.get("/", homeC.interface);

module.exports = route;