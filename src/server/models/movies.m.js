const initOptions = {};
const pgp = require('pg-promise')(initOptions);

const cn = require('../configs/cnStr');
const query = require('./query.m');
const db = pgp(cn);
const tb = 'Movies'

module.exports = {
    all: async () => {
        const rs = await query.all(tb);
        return rs;
    },

    addMovie: async (movie) => {
        const rs = await query.insert(tb, movie);
        return rs;
    },
    
    findByID: async (id) => {
        const rs = await query.one(tb, 'id', id);
        return rs;
    },
    
    findByTitle: async (title) => {
        const rs = await query.any(tb, 'title', title);
        return rs;
    },
    
    findByCountry: async (country) => {
        const rs = await query.any(tb, 'country', country);
        return rs;
    },
    
    findByYear: async (year) => {
        const rs = await query.any(tb, 'year', year);
        return rs;
    },
    
    findByDirector: async (director) => {
        const rs = await query.any(tb, 'director', director);
        return rs;
    },
    
    findByCast: async (cast) => {
        const rs = await query.any(tb, 'cast', cast);
        return rs;
    },
    
    delByID: async (id) => {
        const rs = await query.del(tb, 'id', id)
        return rs;
    },
    
    updateMovie: async (NewMovie, id) => {
        const rs = await query.update(tb, [
            "insertDate",
            "img",
            "source",
            "title",
            "director",
            "cast",
            "genres",
            "country",
            "year",
            "synopsis",
            "rating",
            "ratingCount",
            "favCount"], NewMovie, "id", id);
        return rs;
    },
    
    searchMovie: async (input) => {
        const rs1 = await query.search(tb, 'title', input);
        const rs2 = await query.search(tb, 'country', input);
        const rs3 = await query.search(tb, 'director', input);
        const rs5 = await query.search(tb, 'genres', input);
        const rs4 = await query.search(tb, 'cast', input);
        var result = [...rs1,...rs2,...rs3,...rs4,...rs5 ];
        var setArr = new Set(result);
        var rs = [...setArr];
        return rs;
    },
    
    searchCol: async (col, input) => {
        const rs = await query.search(tb, col, input);
        return rs;
    },
    
    distinct: async (col) => {
        const rs = await query.distinct(tb, col);
        return rs;
    },
    
    maxID: async () => {
        const rs = await query.max(tb, 'id');
        return rs;
    },
    
    maxDate: async () => {
        const rs = await query.max(tb, 'insertDate');
        return rs;
    },
    //test
    findByIDtest: async (id) => { 
        const rs = await query.any(tb, 'id', id)
        return rs;
    },
    
    getRatingInfo: async (username,movieId) => {
        const rs = await db.any('SELECT * FROM "ratingInfo" WHERE "username" = $1 AND "movieId" = $2', [username, movieId]);
        return rs;
    },
    
    checkFavMovie: async (username, movieId) => {
        const rs = await db.one('SELECT COUNT(*) FROM "favoriteMovies" WHERE "username" = $1 AND "movieId" = $2', [username, movieId]);
        if (parseInt(rs.count) == 0)
            return false;
        else
            return true;
    },
    
    addCommentInfo: async (commentInfo) => {
        const rs = await query.insert("commentInfo", commentInfo);
        return rs;
    },
    
    getComment: async (movieId) => {
        const rs = await db.any('SELECT * FROM "commentInfo" WHERE "movieId" = $1', [movieId]);
        return rs;
    }
};