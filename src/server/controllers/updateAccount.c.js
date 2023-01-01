const userM = require('../models/accounts.m');

const bcrypt = require('bcrypt');
const saltRounds = 10;

class updateAccountC {
    async interface(req, res, next) {
        const username = req.body.username;
        if (req.session.username && req.session.isAdmin) {
            let us = await userM.filterByName(username);
            return res.render('updateAccounts', {
                title: "Update account",
                username: us[0]['username'],
                password: us[0]['password'],
                fullname: us[0]['fullname'],
                email: us[0]['email'],
                loggedIn: true,
                isAdmin: req.session.isAdmin
            });
        }
        res.redirect('/home');
    }

    async updateAccount(req, res, next) {
        // let n = await userM.getNumberOfAccounts();
        const isAdmin = false;
        const oldUsername = req.body.oldUn;
        const username = req.body.username;
        const password = req.body.password;
        const fullname = req.body.fullname;
        const email = req.body.email;

        if (password == "" || username == "" || fullname == "" || email == "") {
            let us = await userM.filterByName(oldUsername);
            res.render("updateAccounts", {
                title: "Update account",
                notification: "Vui lòng nhập đầy đủ thông tin!",
                username: us[0]['username'],
                password: us[0]['password'],
                fullname: us[0]['fullname'],
                email: us[0]['email'],
                loggedIn: true,
                isAdmin: req.session.isAdmin
            })
            return false;
        }
        try {
            if (username !== oldUsername)
                var uDb = await userM.byName(username);
            else {
                await userM.byName("");
            }
            let us = await userM.filterByName(oldUsername);
            res.render("updateAccounts", {
                title: "Update account",
                notification: "Tài khoản này đã tồn tại!",
                username: us[0]['username'],
                password: us[0]['password'],
                fullname: us[0]['fullname'],
                email: us[0]['email'],
                loggedIn: true,
                isAdmin: req.session.isAdmin
            })
        }
        catch (err) {
            try {
                const uDb = await userM.byName(oldUsername);
                const pwDb = uDb.password;
                const cmp = pwDb === password;
                if (!cmp) {
                    var pwHashed = await bcrypt.hash(password, saltRounds);
                }
                else pwHashed = password
                const u = {
                    isAdmin: isAdmin,
                    username: username,
                    password: pwHashed,
                    fullname: fullname,
                    email: email,
                }
                const update = await userM.update(oldUsername, u);
                let us = await userM.filterByName(username);
                res.render("updateAccounts", {
                    title: "Update account",
                    notification: "Cập nhật khoản thành công!",
                    username: us[0]['username'],
                    password: us[0]['password'],
                    fullname: us[0]['fullname'],
                    email: us[0]['email'],
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

module.exports = new updateAccountC();