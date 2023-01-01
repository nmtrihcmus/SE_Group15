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
            var page = topRating.slice((curPage-1)*PER_PAGE, curPage*PER_PAGE);
            res.send({
                total: listAll.length,
                curPage: curPage,
                category: "top rating",
                listMovie: page
            })
            
            
            
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    };
    async topRatingPage(req, res, next) {        
        try {
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
            console.log(list);
            var nPage = 90+ Math.ceil(topRating.length/PER_PAGE);
            console.log("============================================= nPage = ", nPage);
            var count = [];
            for (let i = 1; i < nPage; i++) {
                count.push(i+1);
                
            }

            res.render('listMovie',{
                total: topRating.length,
                nPage: count,
                category: "topRating",
                listMovie: list
                
            })
            
            
            
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    };
    
    
}

module.exports = new listC();