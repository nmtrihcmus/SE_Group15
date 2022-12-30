const express = require("express");
const route = express.Router();

const listAccountsR = require('../controllers/listAccounts.c');

route.get("/", listAccountsR.interface);
route.post("/del", listAccountsR.deleteAccount);
route.post("/filter", listAccountsR.filterAccount)

module.exports = route;