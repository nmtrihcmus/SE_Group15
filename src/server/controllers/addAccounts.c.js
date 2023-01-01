const userM = require('../models/accounts.m');

const bcrypt = require('bcrypt');
const saltRounds = 10;

class addAccountC {
    async interface(req, res, next) {
        if (req.session.username && req.session.isAdmin) {
            return res.render('addAccount', {
                title: "Add account",
                loggedIn: true,
                isAdmin: req.session.isAdmin
            });
        }
        res.redirect('/home');
    }

    async addAccounts(req, res, next) {
        // let n = await userM.getNumberOfAccounts();
        const isAdmin = false;
        const username = req.body.username;
        const password = req.body.password;
        const fullname = req.body.fullname;
        const email = req.body.email;

        if (password == "" || username == "" || fullname == "" || email == "") {
            res.render("addAccount", {
                title: "Add account",
                notification: "Vui lòng nhập đầy đủ thông tin!",
                loggedIn: true,
                isAdmin: req.session.isAdmin
            })
            return false;
        }
        try {
            const uDb = await userM.byName(username);
            res.render("addAccount", {
                title: "Add account",
                notification: "Tài khoản này đã tồn tại!",
                loggedIn: true,
                isAdmin: req.session.isAdmin
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
                const create = await userM.addAccount(u);
                res.render("addAccount", {
                    title: "Add account",
                    notification: "Thêm tài khoản thành công!",
                    loggedIn: true,
                    isAdmin: req.session.isAdmin
                })
            }
            catch (err) {
                next(err);
            }
        }
    }
}

module.exports = new addAccountC();