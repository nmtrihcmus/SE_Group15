const loginR = require('./login.r')
const registerR = require('./register.r')
const homeR = require('./home.r')
const logoutR = require('./logout.r')
const movieR = require('./movie.r')

function route(app) {
    app.use('/home', homeR);
    app.use('/register', registerR);
    app.use('/login', loginR);
    app.use('/', loginR);
    app.use('/logout',logoutR);
    app.use('/movie',movieR)
}

module.exports = route;