var session = require('express-session');
const  accM = require('../models/accounts.m');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.signupUser = async (req, res, next)=>{
    try{
        const rs = await accM.all();
        var nAcc = rs.length;
        var hash = await bcrypt.hash(req.body.password, saltRounds);
        
        var objsave = {
            isAdmin: false,
            username: req.body.username,
            password: hash,
            email: req.body.email,
            fullname: req.body.fullname
        }
        console.log(objsave);
        var obj = await accM.addUser(objsave);

        res.render('signin',{
            login: false
        });
    }
    catch(error){
        next(error);
    }
};


exports.loadSignupPage = async (req, res, next)=>{
    try{

        const rs = await accM.all();
        res.render('signup',{
            login: false
        });
    }
    catch(error){
        next(error);
    }
};


