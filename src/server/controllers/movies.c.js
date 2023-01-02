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
    //Render kết quả tìm kiếm phim
    async search(req, res, next) {
        try {
            const country = await movieM.distinct('country');
            const genres = await movieM.distinct('genres');
            
            const listAll = await movieM.all();
            var favMovie = listAll.sort((a, b)=>{return b.favCount-a.favCount}).slice(0,6);
            for (let i = 0; i < 6; i++) {
                var e = favMovie[i];
                e['stt']=i+1;

            }

            var input = req.body.input;//Từ khóa tìm kiếm
            
            var rsYear = [];
            var rsStr = [];
            if(input){
                //Tìm kiếm theo năm
                if(parseInt(input)>1900 && parseInt(input)<2024){
                    rsYear = await movieM.findByYear(parseInt(input));
                    
                }
                //Tìm kiếm theo chuỗi
                rsStr = await movieM.searchMovie(input);
            }
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
                    curPage: 1,
                    total: rs.length,
                    nPage: count,
                    category: "result search",
                    listMovie: list,
                    loggedIn: true,
                    isAdmin: req.session.isAdmin,
                    favMovie: favMovie,
                    genres: genres,
                    country: country

                })
            }
            return res.render('listMovie', {
                input: input,//Từ khóa tìm kiếm
                info: info,
                curPage: 1,
                total: rs.length,
                nPage: count,
                category: "result search",
                listMovie: list,
                loggedIn: false,
                favMovie: favMovie,
                genres: genres,
                country: country
               
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
    //Lọc phim sau khi tìm kiếm
    async filterSearchMovie(req, res, next) {
        try {

            const country = await movieM.distinct('country');
            const genres = await movieM.distinct('genres');
            
            const listAll = await movieM.all();
            var favMovie = listAll.sort((a, b)=>{return b.favCount-a.favCount}).slice(0,6);
            for (let i = 0; i < 6; i++) {
                var e = favMovie[i];
                e['stt']=i+1;

            }
            console.log("============ filter   searchPage");
            console.log("req.body: ", req.body);
            var input = req.query.input;//Từ khóa tìm kiếm
            
            var rsYear = [];
            //Tìm kiếm theo năm
            if(parseInt(input)>1900 && parseInt(input)<2024){
                rsYear = await movieM.findByYear(parseInt(input));
                
            }
            //Tìm kiếm theo chuỗi
            var rsStr = await movieM.searchMovie(input);
            //Kết quả sau khi tìm kiếm
            var rs = [...rsYear, ...rsStr];
            //Lọc phim
            var yearInput = "";
            if(req.body.year){
               yearInput =  req.body.year
            }
            var genreInput = "";
            if(req.body.genre){
                genreInput =  req.body.genre
            }
            var countryInput = "";
            if(req.body.country){
                countryInput =  req.body.country
             }
            console.log(yearInput);
            console.log(genreInput);
            console.log(countryInput);

            const PER_PAGE = 9;
            //Danh sách phim theo trang
            var listMovie = rs;
            if(yearInput){
                listMovie = listMovie.filter(item => item.year == yearInput );
            }
            if(genreInput){
                listMovie = listMovie.filter(item => item.genres == genreInput );
            }
            if(countryInput){
                listMovie = listMovie.filter(item => item.country == countryInput );
            }

            console.log("listMovie, : ", listMovie);

            var info ='';
            if(listMovie.length==0){
                info = "Không tìm thấy thông tin phim trùng khớp";
                
            }
            
            var page = listMovie.slice(0, 9);
            
            var list = [];
            for (let i = 0; i < page.length; i+=3) {
                var row = [];
                row = page.slice(i, i+3);
                list.push(row);
            }
            //Số lượng trang 
            var nPage =  Math.ceil(listMovie.length/PER_PAGE);
        
            var count = []; //Danh sách phân trang (mặc định có trang = 1, nên bắt đầu thêm từ 2)
            for (let i = 1; i < nPage; i++) {
                count.push(i+1);
                
            }
            var inputArr = input +','+yearInput +','+  genreInput +','+countryInput;
            console.log(inputArr);
            if (req.session.username) {
                return res.render('listMovie', {
                    input: inputArr, //Từ khóa tìm kiếm
                    info: info,
                    curPage: 1,
                    total: listMovie.length,
                    nPage: count,
                    category: "result filter search",
                    listMovie: list,
                    loggedIn: true,
                    isAdmin: req.session.isAdmin,
                    favMovie: favMovie,
                    genres: genres,
                    country: country

                })
            }
            return res.render('listMovie', {
                input: inputArr,//Từ khóa tìm kiếm
                info: info,
                curPage: 1,
                total: rs.length,
                nPage: count,
                category: "result filter search",
                listMovie: list,
                loggedIn: false,
                favMovie: favMovie,
                genres: genres,
                country: country
               
            })

            
        }
        catch (error) {
            next(error);
        }
    };
    //API trả về dữ liệu cho client thông tin filter movie theo trang
    async filterSearch(req, res, next) {
        try {
           
          
            var curPage = req.query.page;
            var input = req.body.input;//Chuỗi Từ khóa tìm kiếm
            var arr = input.split(",");//Trong đó : 0: từ khóa input, 1:year, 2:genre, 3:country

            
            var rsYear = [];
            //Tìm kiếm theo năm
            if(parseInt(arr[0])>1900 && parseInt(arr[0])<2024){
                rsYear = await movieM.findByYear(parseInt(arr[0]));
                
            }
            //Tìm kiếm theo chuỗi
            var rsStr = await movieM.searchMovie(arr[0]);
            //Kết quả sau khi tìm kiếm
            var rs = [...rsYear, ...rsStr];
            //Lọc phim
            var yearInput = arr[1];
            var genreInput = arr[2];
            var countryInput = arr[3];
          

            const PER_PAGE = 9;
            //Danh sách phim theo trang
            var listMovie = rs;
            if(yearInput){
                listMovie = listMovie.filter(item => item.year == yearInput );
            }
            if(genreInput){
                listMovie = listMovie.filter(item => item.genres == genreInput );
            }
            if(countryInput){
                listMovie = listMovie.filter(item => item.country == countryInput );
            }
            var pageList= listMovie.slice((curPage-1)*PER_PAGE, curPage*PER_PAGE);

            res.send({
                total: listMovie.length,
                curPage: curPage,
                category: "result filter search",
                listMovie: pageList
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
    
    async detailMoviePage(req, res, next) {
        try {
            const id = req.params.id;
            const movie = await movieM.findByID(id);            
            
            const country = await movieM.distinct('country');
            const genres = await movieM.distinct('genres');
            const listAll = await movieM.all();
            var favMovie = listAll.sort((a, b) => { return b.favCount - a.favCount }).slice(0, 6);
            for (let i = 0; i < 6; i++) {
                var e = favMovie[i];
                e['stt'] = i + 1;
            }
            
            if (req.session.username) {
                return res.render('detailMovie', {
                    title: `Phim: ${movie.title}`,
                    loggedIn: true,
                    isAdmin: req.session.isAdmin,
                    favMovie: favMovie,
                    country: country,
                    genres: genres,
                    movie: movie,
                    rating: 5
                })
            }
            return res.render('detailMovie', {
                title: `Phim: ${movie.title}`,
                loggedIn: false,
                favMovie: favMovie,
                country: country,
                genres: genres,
                movie: movie,
                rating: 5
            })
        }
        catch (err) {
            next(err);
        }
    }
}

module.exports = new movieC();