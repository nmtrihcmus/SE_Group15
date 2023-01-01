const movieM = require('../models/movies.m');

class listC {
    
    async listMoviePage(req, res, next) {        
        try {
            console.log("list Movie");
            const listMovie = await movieM.all();
            console.log(listMovie);
            res.send({
                total: listMovie.length,
                category: "all",
                listMovie: listMovie
            })
            
            
            
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    };
    
    
}

module.exports = new listC();