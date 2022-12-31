const accountM = require('../models/accounts.m');

const bcrypt = require('bcrypt');

class loginC {
    async loginPage(req, res, next) {
        if (!req.session.username) {
            return res.render('login', {
                title: "Login",
            });
        }
        res.redirect('/home');
    }

    async login(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;
        if (password == "" || username == "") {
            res.render("login", {
                title: "Login",
                notification: "Vui lòng nhập đầy đủ thông tin!",
            })
            return false;
        }
        
        try {
            const uDb = await accountM.byName(username);
            const pwDb = uDb.password;
            const cmp = await bcrypt.compare(password, pwDb);
            
            if (cmp) {
                req.session.username = uDb.username;
                req.session.isAdmin = uDb.isAdmin;
                res.redirect('/home');
            }
            else {
                return res.render("login", {
                    title: "Login",
                    notification: "Nhập sai mật khẩu!",
                })
            }
        }
        catch (err) {
            return res.render("login", {
                title: "Login",
                notification: "Nhập sai tài khoản!",
            })
        }
    }
}

module.exports = new loginC();