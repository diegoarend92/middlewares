var routes = require('express').Router();

routes.use('/products', require('./products'));

routes.use('/users', require('./users'));


module.exports = routes;