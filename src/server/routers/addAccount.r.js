const express = require("express");
const route = express.Router();

const addAccountC = require('../controllers/addAccount.c');

route.get("/", addAccountC.interface);
route.post("/", addAccountC.addAccount);

module.exports = route;