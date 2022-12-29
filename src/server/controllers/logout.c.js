class logoutC {
    async logout(req, res, next) {
        try {
            if (req.isAuthenticated()) {
                if (req.session.username) {
                    delete req.session.username;
                }
                req.logout(err => { });
                return res.redirect('/login');
            }
            res.render('home', {
                title: "Home"
            });

        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new logoutC();