const express = require("express");
const route = express.Router();

const movieC = require('../controllers/movies.c');


route.get('/addMovie', movieC.addMoviePage);
route.post('/addMovie', movieC.addMovie);
route.get('/updateMovie', movieC.updateMovie_listPage);
route.get('/updateMovie/:id', movieC.updateMoviePage);
route.post('/updateMovie/:id', movieC.updateMovie);

module.exports = route;