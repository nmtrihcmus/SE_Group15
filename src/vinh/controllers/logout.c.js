var session = require('express-session');


exports.logoutUser = async (req, res, next)=>{
    try{
        if(req.isAuthenticated()){
            req.logout(err => {});
        }
        res.render('home',{
          
            login: false
        });
       
    }
    catch(error){
        next(error);
    }
};





