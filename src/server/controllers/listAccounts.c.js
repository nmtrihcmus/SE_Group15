const userM = require('../models/accounts.m')

class listAccounts {
    async interface(req, res, next) {
        try {
            if (req.session.username) {
                let us = await userM.all();
                return res.render('listAccount', {
                    title: "list account",
                    user: us
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
            if (req.session.username) {
                try {
                    await userM.delByName(username);
                    let us = await userM.all();
                    return res.redirect('/listAccount')
                }
                catch {
                    let us = await userM.all();
                    return res.render('listAccount', {
                        title: "list account",
                        user: us,
                        notification: "Có lỗi xảy ra, vui lòng thử lại",
                    });
                }

            }
            res.redirect('/login');
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new listAccounts();