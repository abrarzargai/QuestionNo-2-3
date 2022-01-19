const express = require('express');
const route = express.Router();
const UserServices = require('../../Services/userService')
const middleware = require('../../utils/Middleware_validation')
const { authenticate } = require('../Middleware/auth')
/***************Routes************/

route.post('/signup',
    middleware.UserValidation,
    middleware.validationFunction,
    UserServices.SignUp);

route.post('/login',
    middleware.UserValidation,
    middleware.validationFunction,
    UserServices.Login);

route.post('/find',
    middleware.UserFindingValidation,
    middleware.validationFunction,
    authenticate,
    UserServices.Find);


module.exports = route;