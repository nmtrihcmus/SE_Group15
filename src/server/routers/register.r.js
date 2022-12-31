const express = require("express");
const route = express.Router();

const registerC = require('../controllers/register.c');

route.get('/', registerC.interface);
route.post('/', registerC.register);

module.exports = route;