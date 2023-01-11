const movieM = require('../models/movies.m');
class homeC {
    async homePage(req, res, next) {
        try {
            const country = await movieM.distinct('country');//Danh sách quốc gia trong thẻ navbar
            const genres = await movieM.distinct('genres');//Danh sách thể loại trong thẻ navbar
            
            //Danh sách toàn bộ movie
            const listAll = await movieM.all();
            //Danh sách top rating
            var newMovie = listAll.sort((a, b)=>{return b.insertDate.getTime()-a.insertDate.getTime()});
            var firstNew = newMovie.slice(0,3);
            var secondNew = newMovie.slice(3,6);
            
            var topRating = listAll.sort((a, b)=>{return b.rating-a.rating;});
            
            var firstRow = topRating.slice(0,3);
            var secondRow = topRating.slice(3,6);

            //Danh sách phim mới 
            

            var favMovie  = listAll.sort((a, b)=>{return b.favCount-a.favCount;}).slice(0,6);
            for (let i = 0; i < 6; i++) {
                var e = favMovie[i];
                e['stt']=i+1;

            }
            
            
            
           
            if (req.session.username) {
                return res.render('home', {
                    title: "Home",
                    firstRow: firstRow,
                    secondRow: secondRow,
                    firstNew: firstNew,
                    secondNew: secondNew,
                    loggedIn: true,
                    isAdmin: req.session.isAdmin,
                    country: country,
                    genres: genres,
                    favMovie: favMovie,
        
                });
            }
            return res.render('home', {
                title: "Home",
                firstRow: firstRow,
                secondRow: secondRow,
                firstNew: firstNew,
                secondNew: secondNew,
                loggedIn: false,
                country: country,
                genres: genres,
                favMovie: favMovie

            });
        }
        catch (error) {
            next(error);
        }
    };
    
    async forgetPassPage(req, res, next) {
        try {
            return res.render('forgetPass', {
                title: "Forget password",
            });
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new homeC();