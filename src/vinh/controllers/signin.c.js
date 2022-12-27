var session = require('express-session');
const userM = require("../models/accounts.m");

const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.signinUser = async (req, res, next)=>{
    try{
        var  uDb  = await userM.findByName(req.body.username);
        var pwDb = uDb.password;

        const match = await bcrypt.compare(req.body.password, pwDb);
        var obj = {
            isAdmin: uDb.isAdmin,
            username: uDb.username,
            password: uDb.password,
            fullname: uDb.fullname,
            email: uDb.email
        };

        var checkLogin = false;
        if(match){
            checkLogin =  true;
            console.log(obj);
            console.log("Dang nhap thanh cong");  
        }else{
           
            console.log("Dang nhap that bai :((( "); 
        }
        res.render('home',{
            
            user: obj, 
            login: checkLogin
        });
       
        
        
    }
    catch(error){
        next(error);
    }
};


exports.loadSigninPage = async (req, res, next)=>{
    try{
        
        res.render('signin',{
            login: false
        });
    }
    catch(error){
        next(error);
    }
};


