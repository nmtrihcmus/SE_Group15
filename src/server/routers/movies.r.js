const express = require("express");
const route = express.Router();

const movieC = require('../controllers/movies.c');
const listC = require('../controllers/list.c');

route.post('/search', movieC.search);
route.post('/search/page', movieC.searchPage);
route.get('/addMovie', movieC.addMoviePage);
route.post('/addMovie', movieC.addMovie);
route.get('/updateMovie/:id', movieC.updateMoviePage);
route.post('/updateMovie/:id', movieC.updateMovie);
route.get('/topRating',listC.topRatingPage);
route.get('/topRating/page',listC.topRatingPageQuery);
route.get('/newMovie',listC.newMoviePage);
route.get('/newMovie/page',listC.newMoviePageQuery);
module.exports = route; 