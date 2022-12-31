class homeC {
    async interface(req, res, next) {
        try {
            if (req.session.username) {
                return res.render('home', {
                    title: "Home"
                });
            }
            res.redirect('/login');
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new homeC();