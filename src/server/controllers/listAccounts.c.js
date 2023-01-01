const userM = require('../models/accounts.m')

class listAccounts {
    async interface(req, res, next) {
        try {
            if (req.session.username && req.session.isAdmin) {
                let user = await userM.all();
                //chỉ hiển thị user
                let us = user.filter(user => user.isAdmin === false);
                return res.render('listAccounts', {
                    title: "List account",
                    user: us,
                    loggedIn: true,
                    isAdmin: req.session.isAdmin
                });
            }
            res.redirect('/login');
        }
        catch (error) {
            next(error);
        }
    }

    async deleteAccount(req, res, next) {
        const username = req.body.username;
        try {
            if (req.session.username && req.session.isAdmin) {
                try {
                    await userM.delByName(username);
                    let us = await userM.all();
                    return res.redirect('/listAccounts')
                }
                catch {
                    let us = await userM.all();
                    return res.render('listAccounts', {
                        title: "List account",
                        user: us,
                        notification: "Có lỗi xảy ra, vui lòng thử lại",
                        loggedIn: true,
                        isAdmin: req.session.isAdmin
                    });
                }

            }
            res.redirect('/login');
        }
        catch (error) {
            next(error);
        }
    }

    async filterAccount(req, res, next) {
        const username = req.body.username;
        try {
            if (req.session.username) {
                let user = await userM.filterByName(username)
                //chỉ hiển thị user
                let us = user.filter((user) => user.isAdmin === false)
                return res.render('listAccounts',
                    {
                        title: "List account",
                        user: us,
                        loggedIn: true,
                        isAdmin: req.session.isAdmin
                    })
            }
            res.redirect('/login');
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new listAccounts();