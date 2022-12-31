const userM = require('../models/accounts.m');
const movieM = require('../models/movie.m');


class movieC {
    async addMovie(req, res, next){
        try{
            for (let j = 0; j < 20; j++) {
                console.log("addmovie Page");

            const allMovies = await movieM.all();
            const nMovie = allMovies.length;
            
            
            var id = 'p1';
            
            if(nMovie !=0){
                var max = -1;
                for (let i = 0; i < nMovie; i++) {
                    const idNum =parseInt(allMovies[i].id.slice(1));
                    
                    if(idNum > max ){
                        max = idNum
                    }
                    
                }
                var str ='';
                
                if(max!= -1){
                    str = max + 1;
                    id = 'p' + str;
                }
            }
            
            
            
            var m = {
                insertDate: new Date(),
                id :  id ,
                img: "https://congthanh.vn/uploads/images/in-poster-phim-anh-dep-.jpg",
                source: "https://www.youtube.com/watch?v=ndSaCjKLmck",
                title: `Mắt biếc`,
                director: `Đạo diễn`,
                cast : " Diễn viên",
                genres : " thể loại",
                country : " Japan",
                year : 2023,
                synopsis : " obj.synopsis asdasidh aisdu aisduh asdihu asidha sduiasd ia",
                rating : 9,
                ratingCount : 8,
                favCount : 821
            }
            var saveObj = {
                insertDate: new Date(),
                id :  id ,
                img: req.body.img,
                source: req.body.source,
                title: req.body.title,
                director: req.body.director,
                cast : req.body.cast,
                genres : req.body.genres,
                country : req.body.country,
                year : parseInt(req.body.year),
                synopsis : req.body.synopsis,
                rating : 0,
                ratingCount : 0,
                favCount : 0
            }
            
            const add = await movieM.addMovie(saveObj);
                
            }
                
            
           
            
            
            
            
            return res.render('addMovie', {
                title: "Form add movie",
                notification: "Đã thêm phim thành công!"
            });
        }
        catch(error){
            console.log(error);
            return res.render('addMovie', {
                title: "Form add movie",
                notification: "Đã thêm phim thất bại!"
            });
            
        }
    };
    async updateMovie(req, res, next){
        try{
            const id = req.params.id;
            console.log(id);
            const allMovies = await movieM.all();
            const nMovie = allMovies.length;
            console.log(nMovie);
            
            var m = {
                insertDate: new Date(),
                id :  id ,
                img: req.body.img,
                source: req.body.source,
                title: req.body.title,
                director: req.body.director,
                cast : req.body.cast,
                genres : req.body.genres,
                country : req.body.country,
                year : req.body.year,
                synopsis : req.body.synopsis,
                rating : 0,
                ratingCount : 0,
                favCount : 0
            }
            console.log(m);
            try {
                const curMovie = await movieM.updateMovie(m, id)
                console.log(curMovie);
            } catch (error) {
                console.log(error);
            }
            return res.render('updateMovie', {
                title: "Form update movie",
                notification: "Đã cập nhật phim thành công!"
            });
        }
        catch(error){
            return res.render('updateMovie', {
                title: "Form update movie",
                notification: "Đã cập nhật phim thất bại!"
            });
            
        }
    };


    addMoviePage(req, res, next) {
        
        return res.render('addMovie', {
            title: "Form add movie"
        });
        
        
    };
    updateMoviePage(req, res, next) {
        console.log(req.params.id);
        return res.render('updateMovie', {
            title: "Form update movie",
            id: req.params.id
        });
        
        
    }
}

module.exports = new movieC();