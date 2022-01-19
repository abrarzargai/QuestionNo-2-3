const express = require('express');
const route = express.Router();
const WeatherService = require('../../Services/WeatherService ')
const middleware = require('../../utils/Middleware_validation')
const { authenticate } = require('../Middleware/auth')
/***************Routes************/


route.post('/get', authenticate, WeatherService.Get);


module.exports = route;