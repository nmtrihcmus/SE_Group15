class homeC {
    async interface(req, res, next) {
        try {
            if (req.isAuthenticated()) {
                if (req.session.username) {
                    return res.render('home', {
                        title: "Home"
                    });
                }
                res.redirect('/login');
            }
            res.render('login', {
                title: "Login"
            });
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new homeC();