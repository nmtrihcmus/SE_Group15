class homeC {
    async homePage(req, res, next) {
        try {
            if (req.session.username) {
                return res.render('home', {
                    title: "Home",
                    loggedIn: true,
                    isAdmin: req.session.isAdmin
                });
            }
            return res.render('home', {
                title: "Home",
                loggedIn: false,
            });
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new homeC();