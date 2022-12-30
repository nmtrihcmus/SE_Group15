class homeC {
    async interface(req, res, next) {
        try {
            if (req.session.username) {
                return res.render('home', {
                    title: "Home",
                    loggedIn: true,
                    homePage: true,
                    isAdmin: req.session.isAdmin
                });
            }
            return res.render('home', {
                title: "Home",
                loggedIn: false,
                homePage: true,
            });
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new homeC();