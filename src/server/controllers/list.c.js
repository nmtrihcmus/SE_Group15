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
    async topRatingPageQuery(req, res, next) {        
        try {
            
            var curPage = req.query.page;
            console.log(curPage);
            const listAll = await movieM.all();
            var topRating = listAll.sort((a, b)=>{return b.rating-a.rating});
            const PER_PAGE = 9;
            var listMovie = topRating.slice((curPage-1)*PER_PAGE, curPage*PER_PAGE);
            res.send({
                total: listAll.length,
                curPage: curPage,
                category: "topRating",
                listMovie: listMovie
            })

        }
        catch (error) {
            console.log(error);
            next(error);
        }
    };
    async topRatingPage(req, res, next) {        
        try {
            const country = await movieM.distinct('country');
            const genres = await movieM.distinct('genres');
            console.log("list Movie");
            const listAll = await movieM.all();
            var topRating = listAll.sort((a, b)=>{return b.rating-a.rating});
            const PER_PAGE = 9;
            
            var page = topRating.slice(0, 9);

            var list = [];
            for (let i = 0; i < page.length; i+=3) {
                var row = [];
                row = page.slice(i, i+3);
                list.push(row);
            }
            
            var nPage =  Math.ceil(topRating.length/PER_PAGE);
            console.log("============================================= nPage = ", nPage);
            var count = [];
            for (let i = 1; i < nPage; i++) {
                count.push(i+1);
                
            }
            if (req.session.username) {
                return res.render('listMovie', {
                    total: topRating.length,
                    nPage: count,
                    category: "topRating",
                    listMovie: list,
                    loggedIn: true,
                    isAdmin: req.session.isAdmin,
                    country: country,
                    genres: genres

                })
            }
            return res.render('listMovie', {
                total: topRating.length,
                nPage: count,
                category: "topRating",
                listMovie: list,
                loggedIn: false,
                country: country,
                genres: genres
               

            })

            
            
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    };
    async newMoviePageQuery(req, res, next) {        
        try {
            
            var curPage = req.query.page;
            console.log("curPage: ", curPage);
            const listAll = await movieM.all();
            var newMovie = listAll.sort((a, b)=>{return b.insertDate.getTime()-a.insertDate.getTime()});
            const PER_PAGE = 9;
            var listMovie = newMovie.slice((curPage-1)*PER_PAGE, curPage*PER_PAGE);
            res.send({
                total: listAll.length,
                curPage: curPage,
                category: "newMovie",
                listMovie: listMovie
            })

        }
        catch (error) {
            console.log(error);
            next(error);
        }
    };
    async newMoviePage(req, res, next) {        
        try {
            const country = await movieM.distinct('country');
            const genres = await movieM.distinct('genres');
            console.log("list new Movie");
            const listAll = await movieM.all();
            var newMovie = listAll.sort((a, b)=>{return b.insertDate.getTime()-a.insertDate.getTime()});
            const PER_PAGE = 9;
            
            var page = newMovie.slice(0, 9);

            var list = [];
            for (let i = 0; i < page.length; i+=3) {
                var row = [];
                row = page.slice(i, i+3);
                list.push(row);
            }
            
            var nPage =  Math.ceil(newMovie.length/PER_PAGE);
            console.log("============================================= new Movie nPage = ", nPage);
            var count = [];
            for (let i = 1; i < nPage; i++) {
                
                count.push(i+1);
                
            }
            if (req.session.username) {
                return res.render('listMovie', {
                    total: newMovie.length,
                    nPage: count,
                    category: "newMovie",
                    listMovie: list,
                    loggedIn: true,
                    isAdmin: req.session.isAdmin,
                    country: country,
                    genres: genres

                })
            }
            return res.render('listMovie', {
                total: newMovie.length,
                nPage: count,
                category: "newMovie",
                listMovie: list,
                loggedIn: false,
                country: country,
                genres: genres
               

            })

            
            
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    };
    
    
}

module.exports = new listC();