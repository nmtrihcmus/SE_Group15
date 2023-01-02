const userM = require('../models/accounts.m')
const bcrypt = require('bcrypt');
const saltRounds = 10;

class profileC {
    async profilePage(req, res, next) {
        try {
            if (req.session.username) {
                const username = req.session.username;
                let user = await userM.byName(username)
                let favoriteMovies = await userM.getFavoriteMovies(username)
                return res.render('profile', {
                    title: "Profile",
                    loggedIn: true,
                    isAdmin: req.session.isAdmin,
                    user: user,
                    favoriteMovies: favoriteMovies
                });
            }
            res.redirect('/home');
        }
        catch (error) {
            next(error);
        }
    }

    async updateProfile(req, res, next) {
        const email = req.body.email;
        const fullname = req.body.fullname;
        const pw = req.body.pw;
        const pwconfirm = req.body.pwconfirm;
        try {
            if (req.session.username) {
                const username = req.session.username;
                let user = await userM.byName(username)
                let favoriteMovies = await userM.getFavoriteMovies(username)
                if (pw != pwconfirm) {
                    return res.render('profile', {
                        title: "Profile",
                        loggedIn: true,
                        isAdmin: req.session.isAdmin,
                        user: user,
                        favoriteMovies: favoriteMovies,
                        notification: "Mật khẩu xác nhận không đúng!",
                        update: true,
                    });
                }
                const pwHashed = await bcrypt.hash(pw, saltRounds);
                const isAdmin = req.session.isAdmin;
                const u = {
                    isAdmin: isAdmin,
                    username: username,
                    password: pwHashed,
                    fullname: fullname,
                    email: email,
                }
                const update = await userM.update(username, u);
                user = await userM.byName(username)
                return res.render('profile', {
                    title: "Profile",
                    loggedIn: true,
                    isAdmin: req.session.isAdmin,
                    user: user,
                    favoriteMovies: favoriteMovies,
                    notification: "Cập nhật thành công!",
                    update: true,
                });

            }
        }
        catch {
            res.redirect('/home')
        }

    }

}

module.exports = new profileC();