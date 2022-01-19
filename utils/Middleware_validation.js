const { check, validationResult } = require('express-validator');

exports.validationFunction = async (req, res, next) => {
	const errors = validationResult(req);
	errors.type = 'expressValidationError';
	if (!errors.isEmpty()) {
		return res.status(500).json(errors.array());
	}
	next();
};
/******User ******/
//Login
exports.UserValidation = [
	check('Email')
	    .notEmpty()
		.withMessage("Must Enter Valid Email")
		.isEmail()
		.withMessage("Enter Valid Email"),
	check('Password')
		.notEmpty()
		.withMessage("Must Enter Password")
];

//Login
exports.UserFindingValidation = [
	check('Lat')
		.notEmpty()
		.withMessage("Must Enter Valid Latitude of Location"),
	check('Long')
		.notEmpty()
		.withMessage("Must Enter Valid Longitude of Location")
];