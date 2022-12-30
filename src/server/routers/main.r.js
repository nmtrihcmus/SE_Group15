const loginR = require('./login.r')
const registerR = require('./register.r')
const homeR = require('./home.r')
const logoutR = require('./logout.r')
const accountR = require('./account.r');

function route(app) {
    app.use('/home', homeR);
    app.use('/register', registerR);
    app.use('/login', loginR);
    app.use('/', homeR);
    app.use('/logout', logoutR)
    app.use('/updateAccounts', accountR)
}

module.exports = route;