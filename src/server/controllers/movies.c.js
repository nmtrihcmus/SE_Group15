const movieM = require('../models/movies.m');

class movieC {
    async addMovie(req, res, next) {
        try {
            const allMovies = await movieM.all();
            const nMovie = allMovies.length;
            var id = 'p1';
            if (nMovie != 0) {
                var max = -1;
                for (let i = 0; i < nMovie; i++) {
                    const idNum = parseInt(allMovies[i].id.slice(1));

                    if (idNum > max) {
                        max = idNum
                    }
                }
                var str = '';

                if (max != -1) {
                    str = max + 1;
                    id = 'p' + str;
                }
            }

            // var m = {
            //     insertDate: new Date(),
            //     id: id,
            //     img: "https://congthanh.vn/uploads/images/in-poster-phim-anh-dep-.jpg",
            //     source: "https://www.youtube.com/watch?v=ndSaCjKLmck",
            //     title: `Mắt biếc`,
            //     director: `Đạo diễn`,
            //     cast: " Diễn viên",
            //     genres: " thể loại",
            //     country: " Japan",
            //     year: 2023,
            //     synopsis: " obj.synopsis asdasidh aisdu aisduh asdihu asidha sduiasd ia",
            //     rating: 9,
            //     ratingCount: 8,
            //     favCount: 821
            // }
            
            var saveObj = {
                insertDate: new Date(),
                id: id,
                img: req.body.img,
                source: req.body.source,
                title: req.body.title,
                director: req.body.director,
                cast: req.body.cast,
                genres: req.body.genres,
                country: req.body.country,
                year: parseInt(req.body.year),
                synopsis: req.body.synopsis,
                rating: 0,
                ratingCount: 0,
                favCount: 0
            }

            const add = await movieM.addMovie(saveObj);

            return res.render('addMovie', {
                title: "Form add movie",
                notification: "Đã thêm phim thành công!",
                loggedIn: true,
                isAdmin: req.session.isAdmin
            });
        }
        catch (error) {
            console.log(error);
            return res.render('addMovie', {
                title: "Form add movie",
                notification: "Đã thêm phim thất bại!",
                loggedIn: true,
                isAdmin: req.session.isAdmin
            });

        }
    };
    
    async updateMovie(req, res, next) {
        const id = req.params.id;
        try {
            // const allMovies = await movieM.all();
            // const nMovie = allMovies.length;
            // console.log(nMovie);
            const movie0 = await movieM.findByID(id);
            var m = {
                insertDate: movie0.insertDate,
                id: id,
                img: req.body.img,
                source: req.body.source,
                title: req.body.title,
                director: req.body.director,
                cast: req.body.cast,
                genres: req.body.genres,
                country: req.body.country,
                year: req.body.year,
                synopsis: req.body.synopsis,
                rating: 0,
                ratingCount: 0,
                favCount: 0
            }
            // console.log(m);
            try {
                const curMovie = await movieM.updateMovie(m, id)
                // console.log(curMovie);
            } catch (error) {
                console.log(error);
            }
            const movie = await movieM.findByID(id);
            return res.render('updateMovie', {
                title: "Form update movie",
                notification: "Đã cập nhật phim thành công!",
                movie: movie,
                loggedIn: true,
                isAdmin: req.session.isAdmin
            });
        }
        catch (error) {
            console.log(error);
            const movie = await movieM.findByID(id);
            return res.render('updateMovie', {
                title: "Form update movie",
                notification: "Đã cập nhật phim thất bại!",
                movie: movie,
                loggedIn: true,
                isAdmin: req.session.isAdmin
            });

        }
    };

    async addMoviePage(req, res, next) {        
        try {
            if (req.session.username && req.session.isAdmin) {
                return res.render('addMovie', {
                    title: "Form add movie",
                    loggedIn: true,
                    isAdmin: req.session.isAdmin
                });
            }
            return res.redirect('/home');
        }
        catch (error) {
            next(error);
        }
    };
    
    async updateMoviePage(req, res, next) {
        try {
            if (req.session.username && req.session.isAdmin) {
                const movie = await movieM.findByID(req.params.id);
                return res.render('updateMovie', {
                    title: "Form update movie",
                    movie: movie,
                    loggedIn: true,
                    isAdmin: req.session.isAdmin,
                    page: req.params.page
                });
            }
            return res.redirect('/home');
        }
        catch (error) {
            next(error);
        }
    };
    
    async updateMovie_listPage(req, res, next) {
        try {
            if (req.session.username && req.session.isAdmin) {
                const allMovies = await movieM.all();
                const itemsPerPage = 10;
                const nMovies = allMovies.length;
                const maxPage = Math.ceil(nMovies / itemsPerPage);
                var curPage = parseInt(req.params.page);
                if (curPage < 1)
                    curPage = 1;
                if (curPage > maxPage)
                    curPage = maxPage;
                const start = (curPage - 1) * itemsPerPage;
                const end = curPage * itemsPerPage;
                return res.render('updateMovie_list', {
                    title: "Movie list",
                    loggedIn: true,
                    isAdmin: req.session.isAdmin,
                    data: allMovies.slice(start, end),
                    page: curPage,
                    maxPage: maxPage
                });
            }
            return res.redirect('/home');
        }
        catch (error) {
            next(error);
        }
    };
    
    async deleteMovie_listPage(req, res, next) {
        try {
            if (req.session.username && req.session.isAdmin) {
                const allMovies = await movieM.all();
                const itemsPerPage = 10;
                const nMovies = allMovies.length;
                const maxPage = Math.ceil(nMovies / itemsPerPage);
                var curPage = parseInt(req.params.page);
                if (curPage < 1)
                    curPage = 1;
                if (curPage > maxPage)
                    curPage = maxPage;
                const start = (curPage - 1) * itemsPerPage;
                const end = curPage * itemsPerPage;                
                return res.render('deleteMovie_list', {
                    title: "Movie list",
                    loggedIn: true,
                    isAdmin: req.session.isAdmin,
                    data: allMovies.slice(start, end),
                    page: curPage,
                    maxPage: maxPage
                });
            }
            return res.redirect('/home');
        }
        catch (error) {
            next(error);
        }
    };
    
    async deleteMovie(req, res, next) {
        try {
            if (req.session.username && req.session.isAdmin) {
                const id = req.params.id;
                const del = await movieM.delByID(id);
                
                const allMovies = await movieM.all();
                const itemsPerPage = 10;
                const nMovies = allMovies.length;
                const maxPage = Math.ceil(nMovies / itemsPerPage);
                var curPage = parseInt(req.params.page);
                if (curPage < 1)
                    curPage = 1;
                if (curPage > maxPage)
                    curPage = maxPage;
                const start = (curPage - 1) * itemsPerPage;
                const end = curPage * itemsPerPage;
                
                return res.render('deleteMovie_list', {
                    title: "Movie list",
                    loggedIn: true,
                    isAdmin: req.session.isAdmin,
                    data: allMovies.slice(start, end),
                    page: curPage,
                    maxPage: maxPage,
                    notification: "Xóa phim thành công!"
                });
            }
            return res.redirect('/home');
        }
        catch (error) {
            console.log(error);
            
            const allMovies = await movieM.all();
            const itemsPerPage = 10;
            const nMovies = allMovies.length;
            const maxPage = Math.ceil(nMovies / itemsPerPage);
            var curPage = parseInt(req.params.page);
            if (curPage < 1)
                curPage = 1;
            if (curPage > maxPage)
                curPage = maxPage;
            const start = (curPage - 1) * itemsPerPage;
            const end = curPage * itemsPerPage;

            return res.render('deleteMovie_list', {
                title: "Movie list",
                loggedIn: true,
                isAdmin: req.session.isAdmin,
                data: allMovies.slice(start, end),
                page: curPage,
                maxPage: maxPage,
                notification: "Xóa phim thất bại!"
            });
        }
    };
}

module.exports = new movieC();