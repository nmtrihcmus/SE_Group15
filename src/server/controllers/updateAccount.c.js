const userM = require('../models/accounts.m');

const bcrypt = require('bcrypt');
const saltRounds = 10;

class updateAccountC {
    async interface(req, res, next) {
        const username = req.body.username;
        if (req.session.username) {
            let us = await userM.filterByName(username);
            return res.render('updateAccount', {
                title: "Update account",
                username: us[0]['username'],
                fullname: us[0]['fullname'],
                email: us[0]['email'],
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
            res.render("updateAccount", {
                title: "Update account",
                notification: "Vui lòng nhập đầy đủ thông tin!",
                username: us[0]['username'],
                fullname: us[0]['fullname'],
                email: us[0]['email'],
            })
            return false;
        }
        try {
            const uDb = await userM.byName(username);
            let us = await userM.filterByName(oldUsername);
            res.render("updateAccount", {
                title: "Update account",
                notification: "Tài khoản này đã tồn tại!",
                username: us[0]['username'],
                fullname: us[0]['fullname'],
                email: us[0]['email'],
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
                const update = await userM.update(oldUsername, u);
                let us = await userM.filterByName(username);
                res.render("updateAccount", {
                    title: "Update account",
                    notification: "Cập nhật khoản thành công!",
                    username: us[0]['username'],
                    fullname: us[0]['fullname'],
                    email: us[0]['email'],

                })
            }
            catch (err) {
                next(err);
            }
        }
    }
}

module.exports = new updateAccountC();