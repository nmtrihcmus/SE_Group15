const movieM = require('../models/movies.m');


class listC {
    //Hiển thị toàn bộ phim
    async listAllMovie(req, res, next) {
        try {
            const country = await movieM.distinct('country');
            const genres = await movieM.distinct('genres');
            
            const listAll = await movieM.all();
            var favMovie = listAll.sort((a, b)=>{return b.favCount-a.favCount}).slice(0,6);
            const PER_PAGE = 9; //Số phim mỗi trang
            
            var page = listAll.slice(0, 9);

            var list = [];
            //Chia phim theo từng row một
            for (let i = 0; i < page.length; i+=3) {
                var row = [];
                row = page.slice(i, i+3);
                list.push(row);
            }
            //Số lượng trang 
            var nPage =  Math.ceil(listAll.length/PER_PAGE);
            
            var count = [];
            for (let i = 1; i < nPage; i++) {
                count.push(i+1);
                
            }
            if (req.session.username) {
                return res.render('listMovie', {
                    total: listAll.length,
                    nPage: count,
                    category: "allMovie",
                    listMovie: list,
                    loggedIn: true,
                    isAdmin: req.session.isAdmin,
                    country: country,
                    genres: genres,
                    favMovie: favMovie

                })
            }
            return res.render('listMovie', {
                total: listAll.length,
                nPage: count,
                category: "allMovie",
                listMovie: list,
                loggedIn: false,
                country: country,
                genres: genres,
                favMovie: favMovie
               

            })

            
            
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    };
    //API danh sách toàn bộ phim  theo trang
    async listAllMoviePage(req, res, next) {
        try {
          
            var curPage = req.query.page;
            console.log(curPage);
            const listAll = await movieM.all();
            
            const PER_PAGE = 9;
            var listMovie = listAll.slice((curPage-1)*PER_PAGE, curPage*PER_PAGE);
            res.send({
                total: listAll.length,
                curPage: curPage,
                category: "allMovie",
                listMovie: listMovie

            })

            
        }
        catch (error) {
            next(error);
        }
    };
    //API trả về danh sách phim top rating theo trang
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
    //Render top rating Page
    async topRatingPage(req, res, next) {        
        try {
            const country = await movieM.distinct('country');
            const genres = await movieM.distinct('genres');
            
            const listAll = await movieM.all();
            var favMovie = listAll.sort((a, b)=>{return b.favCount-a.favCount}).slice(0,6);
            var topRating = listAll.sort((a, b)=>{return b.rating-a.rating});

            
            const PER_PAGE = 9; //Số phim mỗi trang
            
            var page = topRating.slice(0, 9);

            var list = [];
            //Chia phim theo từng row một
            for (let i = 0; i < page.length; i+=3) {
                var row = [];
                row = page.slice(i, i+3);
                list.push(row);
            }
            //Số lượng trang 
            var nPage =  Math.ceil(topRating.length/PER_PAGE);
            
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
                    genres: genres,
                    favMovie: favMovie

                })
            }
            return res.render('listMovie', {
                total: topRating.length,
                nPage: count,
                category: "topRating",
                listMovie: list,
                loggedIn: false,
                country: country,
                genres: genres,
                favMovie: favMovie
               

            })

            
            
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    };
    //API trả về danh sách phim mới theo trang
    async newMoviePageQuery(req, res, next) {        
        try {
            
            var curPage = req.query.page;
            
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
    //Render New Movie Page
    async newMoviePage(req, res, next) {        
        try {
            const country = await movieM.distinct('country');
            const genres = await movieM.distinct('genres');
            
            const listAll = await movieM.all();
            //Sắp xếp theo thời gian gần nhất
            var favMovie = listAll.sort((a, b)=>{return b.favCount-a.favCount}).slice(0,6);
            var newMovie = listAll.sort((a, b)=>{return b.insertDate.getTime()-a.insertDate.getTime()});
            
            const PER_PAGE = 9;
            
            var page = newMovie.slice(0, 9);

            var list = [];
            for (let i = 0; i < page.length; i+=3) {
                var row = [];
                row = page.slice(i, i+3);
                list.push(row);
            }
            //Số lượng trang 
            var nPage =  Math.ceil(newMovie.length/PER_PAGE);
           
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
                    genres: genres,
                    favMovie: favMovie

                })
            }
            return res.render('listMovie', {
                total: newMovie.length,
                nPage: count,
                category: "newMovie",
                listMovie: list,
                loggedIn: false,
                country: country,
                genres: genres,
                favMovie: favMovie
               

            })

            
            
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    };

    //Render danh sách phim theo thể loại
    async listMovieByGenre(req, res, next) {        
        try {
            const country = await movieM.distinct('country');
            const genres = await movieM.distinct('genres');
            const listAll = await movieM.all();
            var favMovie = listAll.sort((a, b)=>{return b.favCount-a.favCount}).slice(0,6);

            var curGenre = req.query.genre;
            curGenre = curGenre.replace(/%20/g, " ");
            var curPage = req.query.page;
            
            
            console.log("curGenre: ", curGenre);
           
            console.log("page: ", req.query.page);
            //Tìm kiếm phim theo thể loại curGenre
            const listMovieByGenre = await movieM.searchCol('genres', curGenre);
            //console.log(listMovieByGenre);
            curGenre = curGenre.replace(/ /g, "%20");  //Thay thế khoảng trắng = %20
            const PER_PAGE = 9;
            
            var page = listMovieByGenre.slice((curPage-1)*PER_PAGE, curPage*PER_PAGE);
            
            var list = [];
            for (let i = 0; i < page.length; i+=3) {
                var row = [];
                row = page.slice(i, i+3);
                list.push(row);
            }
            //Số lượng trang 
            var nPage =  Math.ceil(listMovieByGenre.length/PER_PAGE);
            console.log(nPage);
            if (req.session.username) {
                
                return res.render('listMovieNav', {
                    maxPage: nPage,
                    page: curPage,
                    category: "genre",
                    listMovie: list,
                    loggedIn: true,
                    isAdmin: req.session.isAdmin,
                    country: country,
                    genres: genres,
                    curGenre: curGenre ,//Giá trị Genre trả về lại cho Client để tiếp tục gọi AJAX theo trang
                    favMovie: favMovie
                })
            }
            return res.render('listMovieNav', {
                maxPage: nPage,
                page: curPage,
                category: "genre",
                listMovie: list,
                loggedIn: false,
                country: country,
                genres: genres,
                curGenre: curGenre, //Giá trị Genre trả về lại cho Client để tiếp tục gọi AJAX theo trang
                favMovie: favMovie
            })
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    };
    //Render danh sách phim theo quốc gia
    async listMovieByCountry(req, res, next) {        
        try {
            const country = await movieM.distinct('country');
            const genres = await movieM.distinct('genres');
            const listAll = await movieM.all();
            var favMovie = listAll.sort((a, b)=>{return b.favCount-a.favCount}).slice(0,6);
            var curGenre = req.query.country;
            curGenre = curGenre.replace(/%20/g, " ");//Thay %20 = khoảng trắng
            var curPage = req.query.page;
            
            
            console.log("curGenre: ", curGenre);
           
            console.log("page: ", req.query.page);
            //Tìm kiếm phim theo thể loại curGenre
            const listMovieByGenre = await movieM.searchCol('country', curGenre);
            //console.log(listMovieByGenre);
            curGenre = curGenre.replace(/ /g, "%20");  //Thay thế khoảng trắng = %20
            const PER_PAGE = 9;
            
            var page = listMovieByGenre.slice((curPage-1)*PER_PAGE, curPage*PER_PAGE);
            
            var list = [];
            for (let i = 0; i < page.length; i+=3) {
                var row = [];
                row = page.slice(i, i+3);
                list.push(row);
            }
            //Số lượng trang 
            var nPage =  Math.ceil(listMovieByGenre.length/PER_PAGE);
            console.log(nPage);
            if (req.session.username) {
                
                return res.render('listMovieNav', {
                    maxPage: nPage,
                    page: curPage,
                    category: "country",
                    listMovie: list,
                    loggedIn: true,
                    isAdmin: req.session.isAdmin,
                    country: country,
                    genres: genres,
                    curGenre: curGenre, //Giá trị Genre trả về lại cho Client để tiếp tục gọi AJAX theo trang
                    favMovie: favMovie
                })
            }
            return res.render('listMovieNav', {
                maxPage: nPage,
                page: curPage,
                category: "country",
                listMovie: list,
                loggedIn: false,
                country: country,
                genres: genres,
                curGenre: curGenre, //Giá trị Genre trả về lại cho Client để tiếp tục gọi AJAX theo trang
                favMovie: favMovie
            })
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    };
    
    
}

module.exports = new listC();