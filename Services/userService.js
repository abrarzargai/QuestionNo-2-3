const userModel = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const argon2 = require('argon2');
var jwt = require('jsonwebtoken');



//******Generatingg token****/

const signToken = (user) => {
    const payload = {
        userdata: {
            id: user._id,
        },
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
    });
};
/***************Services************/

//SignUp
exports.SignUp = catchAsync(async (req, res, next) => {

    const User = await userModel.find({ Email: req.body.Email })
    if (!User[0]) {
        const Record = await userModel.create({ ...req.body })
        if (!Record) {
            throw new Error('Error! User cannot be created');
        }
        else {
            return res.status(201).json({
                success: true, message: "New User Account Created Successfully", Record
            })
        }
    }
    else {
        return next(new Error('Error! User with this Email already exist'))

    }

})

//Login
exports.Login = catchAsync(async (req, res, next) => {
    const User = await userModel.find({ Email: req.body.Email })
    if (User[0]) {
        if (await argon2.verify(User[0].Password, req.body.Password)) {
            const token = signToken(User[0]);
            return res.status(200).json({
                success: true, message: "Login Successfully", token, User
            })
        }
        else {
            throw new Error('Error! Invalid Password');
        }
    }
    else {
        return next(new Error('User Not Found'))

    }
})

exports.Find = catchAsync(async (req, res, next) => {
    const User = await userModel.find()
    var DataArray = []
    await User.map(async (data) => {
        
        const distance = await calcCrow(req.body.Lat, req.body.Long, data.Location.Lat, data.Location.Long)
        if (distance <= 5) {
            DataArray.push({data, Distance: distance})
        }
    })
    if (!DataArray[0]){
        throw new Error('Error! No user find with in 5 km');
    }
    return res.status(200).json({
        success: true, message: "Data Found", TotalUsers: DataArray.length ,DataArray 
    })

})


// *********Finding GeoLocation within Defined Radius********
function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d.toFixed(1);
}
// Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180;
}



