var session = require('express-session');

exports.homePage = async (req, res, next)=>{
    try{
        if(req.isAuthenticated()){
            return res.render('home',{
                
                login: true
            });
        }
        res.render('signin',{
            login: false
        });
    }
    catch(error){
        next(error);
    }
};


