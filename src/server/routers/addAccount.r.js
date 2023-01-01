const express = require("express");
const route = express.Router();

const addAccountC = require('../controllers/addAccounts.c');

route.get("/", addAccountC.interface);
route.post("/", addAccountC.addAccounts);

module.exports = route;