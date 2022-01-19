const express = require('express');
const router = express.Router();

//Required api's 

const User = require('./Routes/Userapi')
const Weather = require('./Routes/Weatherapi')

/*********Main Api**********/
router.use('/user',User);
router.use('/Weather', Weather);


module.exports = router;