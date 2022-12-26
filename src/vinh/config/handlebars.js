const exphbs = require('express-handlebars');

module.exports = (app) => {

    app.engine('hbs', exphbs.engine({
        defaultLayout: 'container.hbs',
        extname: '.hbs'
    }));
    app.set('view engine', 'hbs');
};