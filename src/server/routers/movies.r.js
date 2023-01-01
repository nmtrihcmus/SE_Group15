const express = require("express");
const route = express.Router();

const movieC = require('../controllers/movies.c');


route.get('/addMovie', movieC.addMoviePage);
route.post('/addMovie', movieC.addMovie);
route.get('/updateMovie/:page', movieC.updateMovie_listPage);
route.get('/updateMovie/:page/:id', movieC.updateMoviePage);
route.post('/updateMovie/:page/:id', movieC.updateMovie);

module.exports = route;