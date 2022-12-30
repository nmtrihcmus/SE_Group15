const express = require("express");
const route = express.Router();
const accountC = require('../controllers/account.c');

route.get('/', accountC.interface);
route.post('/', accountC.updateAccounts);

module.exports = route;