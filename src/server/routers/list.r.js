const express = require("express");
const route = express.Router();
const listC = require('../controllers/list.c');

route.get('/', listC.listAllMovie);
route.get('/page', listC.listAllMoviePage);
// route.get('/topRating', listC.list);
// route.get('/newMovie', listC.list);
// route.get('/topRating', listC.list);
module.exports = route;