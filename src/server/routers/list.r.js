const express = require("express");
const route = express.Router();
const listC = require('../controllers/list.c');

route.get('/', listC.listMoviePage);
// route.get('/topRating', listC.list);
// route.get('/newMovie', listC.list);
// route.get('/topRating', listC.list);
module.exports = route;