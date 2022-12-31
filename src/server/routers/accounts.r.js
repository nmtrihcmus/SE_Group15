const express = require("express");
const route = express.Router();
const accountC = require('../controllers/accounts.c');

route.get('/updateAccount', accountC.updateAccountPage);
route.post('/updateAccount', accountC.updateAccount);

module.exports = route;