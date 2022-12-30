const express = require('express');
const route = require('./routers/main.r');

const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

require('./configs/hbs')(app);
require('./configs/session')(app);

route(app);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode | 500;
    res.status(statusCode).send(err.message);
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));