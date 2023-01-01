const express = require("express");
const route = express.Router();

const movieC = require('../controllers/movie.c');


route.get('/add', movieC.addMoviePage);
route.post('/add', movieC.addMovie);
route.get('/form-update/:id', movieC.updateMoviePage);
route.post('/update/:id', movieC.updateMovie);
module.exports = route;