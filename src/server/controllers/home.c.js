const movieM = require('../models/movies.m');
class homeC {
    async homePage(req, res, next) {
        try {
            const listAll = await movieM.all();
            var topRating = listAll.sort((a, b)=>{return b.rating-a.rating});
            
            var firstRow = topRating.slice(0,3);
            var secondRow = topRating.slice(3,6);
            var newMovie = listAll.sort((a, b)=>{return b.insertDate.getTime()-a.insertDate.getTime()});
           
            var firstNew = newMovie.slice(0,3);
            var secondNew = newMovie.slice(3,6);
            if (req.session.username) {
                return res.render('home', {
                    title: "Home",
                    firstRow: firstRow,
                    secondRow: secondRow,
                    firstNew: firstNew,
                    secondNew: secondNew,
                    loggedIn: true,
                    isAdmin: req.session.isAdmin
                });
            }
            return res.render('home', {
                title: "Home",
                firstRow: firstRow,
                secondRow: secondRow,
                firstNew: firstNew,
                secondNew: secondNew,
                loggedIn: false,
            });
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new homeC();