const express = require("express");
const route = express.Router();

const movieC = require('../controllers/movies.c');
const listC = require('../controllers/list.c');

route.post('/search', movieC.search);
route.post('/search/page', movieC.searchPage);
route.post('/filter', movieC.filterSearchMovie);
route.post('/filter/page', movieC.filterSearch);

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
route.get('/genre', listC.listMovieByGenre);

route.get('/country', listC.listMovieByCountry);

route.get('/detail/:id', movieC.detailMoviePage);
route.post('/detail/:id', movieC.commentMovie);
route.post('/rating/:id', movieC.ratingMovie);
route.post('/addToFavMovie/:id', movieC.addToFavMovie);
route.post('/deleteFromFavMovie/:id', movieC.deleteFromFavMovie);
route.get('/streaming/:id', movieC.streamingMovie);
route.post('/streaming/:id', movieC.commentMovie);

module.exports = route;