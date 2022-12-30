const express = require("express");
const route = express.Router();

const movieC = require('../controllers/movie.c');

route.get('/', movieC.interface);
route.get('/add', movieC.addMoviePage);
route.post('/add', movieC.addMovie);
route.get('/update', movieC.updateMoviePage);
route.post('/update', movieC.updateMovie);
module.exports = route;