const initOptions = {};
const pgp = require('pg-promise')(initOptions);

const cn = require('../configs/cnStr');
const query = require('./query.m');
const db = pgp(cn);
const tb = 'Movies'

module.exports = {
    all: async ()=>{
        const rs = await query.all(tb);
        
        return rs;
    },

    addMovie: async (movie)=>{
        const rs = await query.insert(tb, movie);
        
        return rs;
        
    },
    findByID: async (id)=>{
        const rs = await query.one(tb, 'id', id);
        return rs;
    },
    findByTitle: async (title)=>{
        const rs = await query.any(tb, 'title', title);
        return rs;
    },
    findByCountry: async (country)=>{
        const rs = await query.any(tb, 'country', country);
        return rs;
    },
    findByYear: async (year)=>{
        const rs = await query.any(tb, 'year', year);
        return rs;
    },
    findByDirector: async (director)=>{
        const rs = await query.any(tb, 'director', director);
        return rs;
    },
    findByCast: async (cast)=>{
        const rs = await query.any(tb, 'cast', cast);
        return rs;
    }
    ,
    delByID:  async (id)=>{
        const rs = await query.del(tb, 'id', id)
        return rs;
    }
    ,
    updateMovie:  async (NewMovie, id)=>{
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
            "favCount" ], NewMovie, "id", id);
        return rs;
        
    },
    maxID: async ()=>{
        const rs = await query.max(tb, 'id');
        return rs;
    },
    maxDate: async ()=>{
        const rs = await query.max(tb, 'insertDate');
        return rs;
    }
};