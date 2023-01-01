const accountM = require('../models/accounts.m');

const bcrypt = require('bcrypt');
const saltRounds = 10;

class registerC {
    async registerPage(req, res, next) {
        if (!req.session.username) {
            return res.render('register', {
                title: "Register",
            });
        }
        res.redirect('home');
    }

    async register(req, res, next) {
        // let n = await userM.getNumberOfAccounts();
        const isAdmin = false;
        const username = req.body.username;
        const password = req.body.password;
        const repwd = req.body.repassword;
        const fullname = req.body.fullname;
        const email = req.body.email;

        if (password !== repwd) {
            res.render("register", {
                title: "Register",
                notification: "Mật khẩu xác nhận không đúng!",
            })
            return false;
        }
        if (password == "" || username == "" || repwd == "" || fullname == "" || email == "") {
            res.render("register", {
                title: "Register",
                notification: "Vui lòng nhập đầy đủ thông tin!",
            })
            return false;
        }
        try {
            const uDb = await accountM.byName(username);
            res.render("register", {
                title: "Register",
                notification: "Tài khoản này đã tồn tại!",
            })
        }
        catch (err) {
            try {
                const pwHashed = await bcrypt.hash(password, saltRounds);
                const u = {
                    isAdmin: isAdmin,
                    username: username,
                    password: pwHashed,
                    fullname: fullname,
                    email: email,
                }
                const create = await accountM.addAccount(u);
                res.render("register", {
                    title: "Register",
                    notification: "Đăng ký thành công!",
                })
            }
            catch (err) {
                next(err);
            }
        }
    }
}

module.exports = new registerC();