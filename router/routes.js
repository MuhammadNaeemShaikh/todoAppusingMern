const routes = require('express').Router();
const userController = require('../controller/user.controler');

routes.post('/signup', userController.signup);
routes.post('/signin', userController.signin);



module.exports = routes;