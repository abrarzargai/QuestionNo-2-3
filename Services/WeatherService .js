const catchAsync = require('../utils/catchAsync');
const axios = require('axios');
var request = require("request");
/***************Services************/

//Geting User
exports.Get = catchAsync(async (req, res, next) => {

    const weatherURL = `http://api.weatherapi.com/v1/current.json?key=${process.env.WeatherAPI}&q=${req.body.Location||"islamabad"}`;
    request(weatherURL, function (error, response, body) {
        let weather_json = JSON.parse(body);
        if (weather_json)
        {
            return res.status(200).json({
                success: true, message: "Data Found", weather_json
            })
        }
        throw new Error(`Error! ${error}`);
    });

})

