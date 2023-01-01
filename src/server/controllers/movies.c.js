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
        try {
            const id = req.params.id;
            const allMovies = await movieM.all();
            const nMovie = allMovies.length;
            // console.log(nMovie);

            var m = {
                insertDate: new Date(),
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
            return res.render('updateMovie', {
                title: "Form update movie",
                notification: "Đã cập nhật phim thành công!",
                id: req.params.id,
                loggedIn: true,
                isAdmin: req.session.isAdmin
            });
        }
        catch (error) {
            console.log(error);
            return res.render('updateMovie', {
                title: "Form update movie",
                notification: "Đã cập nhật phim thất bại!",
                id: req.params.id,
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
                return res.render('updateMovie', {
                    title: "Form update movie",
                    id: req.params.id,
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
    async search(req, res, next) {
        try {
            var input = req.body.input;
            var rsYear = [];
            if(parseInt(input)>1900 && parseInt(input)<2024){
                rsYear = await movieM.findByYear(parseInt(input));
                
            }
            var rsStr = await movieM.searchMovie(input);
            
            var rs = [...rsYear, ...rsStr];
            console.log("rs ==================================", rs);
            var info ='';
            if(rs.length==0){
                
                info = "Không tìm thấy thông tin phim trùng khớp";
                
            }
            
            
            const PER_PAGE = 9;
            
            var page = rs.slice(0, 9);
            console.log("========================= page = ", page );
            var list = [];
            for (let i = 0; i < page.length; i+=3) {
                var row = [];
                row = page.slice(i, i+3);
                list.push(row);
            }
            
            var nPage =  Math.ceil(rs.length/PER_PAGE);
        
            var count = [];
            for (let i = 1; i < nPage; i++) {
                count.push(i+1);
                
            }
            if (req.session.username) {
                return res.render('listMovie', {
                    input: input,
                    info: info,
                    total: rs.length,

                    nPage: count,
                    category: "result search",
                    listMovie: list,
                    loggedIn: true,
                    isAdmin: req.session.isAdmin

                })
            }
            return res.render('listMovie', {
                input: input,
                info: info,
                total: rs.length,

                nPage: count,
                category: "result search",
                listMovie: list,
                loggedIn: false
               
            })

            
        }
        catch (error) {
            next(error);
        }
    };
    async searchPage(req, res, next) {
        try {
            console.log("searchPage");
            var curPage = req.query.page;
            var input = req.body.input;
            console.log(req.body);
            var rsYear = [];
            if(parseInt(input)>1900 && parseInt(input)<2024){
                rsYear = await movieM.findByYear(parseInt(input));
                
            }
            var rsStr = await movieM.searchMovie(input);
            
            var rs = [...rsYear, ...rsStr];
            console.log("rs ==================================", rs);
            
            
            
            const PER_PAGE = 9;
            
            var page = rs.slice(0, 9);
            console.log("========================= page = ", page );
            
            
        
           
            var listMovie = rs.slice((curPage-1)*PER_PAGE, curPage*PER_PAGE);
            res.send({
                total: rs.length,
                curPage: curPage,
                category: "result search",
                listMovie: listMovie
            })

            
        }
        catch (error) {
            next(error);
        }
    };
}

module.exports = new movieC();