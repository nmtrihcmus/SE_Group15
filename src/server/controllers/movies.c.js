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
            
            try {
                const curMovie = await movieM.updateMovie(m, id)
                
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
    //Render kết quả tìm kiếm phim
    async search(req, res, next) {
        try {
            var input = req.body.input;//Từ khóa tìm kiếm
            var rsYear = [];
            //Tìm kiếm theo năm
            if(parseInt(input)>1900 && parseInt(input)<2024){
                rsYear = await movieM.findByYear(parseInt(input));
                
            }
            //Tìm kiếm theo chuỗi
            var rsStr = await movieM.searchMovie(input);
            //Danh sách phim theo kết quả tìm kiếm
            var rs = [...rsYear, ...rsStr];
            
            var info ='';
            if(rs.length==0){
                info = "Không tìm thấy thông tin phim trùng khớp";
                
            }
            
            
            const PER_PAGE = 9;
            
            var page = rs.slice(0, 9);
            
            var list = [];
            for (let i = 0; i < page.length; i+=3) {
                var row = [];
                row = page.slice(i, i+3);
                list.push(row);
            }
            //Số lượng trang 
            var nPage =  Math.ceil(rs.length/PER_PAGE);
        
            var count = []; //Danh sách phân trang (mặc định có trang = 1, nên bắt đầu thêm từ 2)
            for (let i = 1; i < nPage; i++) {
                count.push(i+1);
                
            }
            if (req.session.username) {
                return res.render('listMovie', {
                    input: input, //Từ khóa tìm kiếm
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
                input: input,//Từ khóa tìm kiếm
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
    //API danh sách phim tìm kiếm theo trang
    async searchPage(req, res, next) {
        try {
            console.log("searchPage");
            var curPage = req.query.page; //Số trang hiện tại
            var input = req.body.input;//Từ khóa tìm kiếm
            
            var rsYear = [];
            //Tìm kiếm theo năm
            if(parseInt(input)>1900 && parseInt(input)<2024){
                rsYear = await movieM.findByYear(parseInt(input));
                
            }
            //Tìm kiếm theo chuỗi
            var rsStr = await movieM.searchMovie(input);
            //Kết quả sau khi tìm kiếm
            var rs = [...rsYear, ...rsStr];
            const PER_PAGE = 9;
            //Danh sách phim theo trang
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