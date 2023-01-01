const express = require("express");
const route = express.Router();

const movieC = require('../controllers/movies.c');
const listC = require('../controllers/list.c');


route.get('/addMovie', movieC.addMoviePage);
route.post('/addMovie', movieC.addMovie);
route.get('/updateMovie/:page', movieC.updateMovie_listPage);
route.get('/updateMovie/:page/:id', movieC.updateMoviePage);
route.post('/updateMovie/:page/:id', movieC.updateMovie);
route.get('/deleteMovie/:page', movieC.deleteMovie_listPage);
route.post('/deleteMovie/:page/:id', movieC.deleteMovie);
route.get('/topRating', listC.topRatingPage);
route.get('/topRating/page', listC.topRatingPageQuery);
route.get('/newMovie', listC.newMoviePage);
route.get('/newMovie/page', listC.newMoviePageQuery);

module.exports = route;