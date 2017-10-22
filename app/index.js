"use strict"
let controller = require('./controllers');

module.exports = (app) => {
    //Setting Up the Router
    app.use('/', require('./routes')(controller));
}