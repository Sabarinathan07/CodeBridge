const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// @route GET api/auth
// @desc Get user
// @access Public
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server error auth');
	}
});

// @route POST api/users
// @description authenticatioe user and get token
// @access Public
router.post(
	'/',
	[
		//express-validator

		check('email', 'Please include a valid Email').isEmail(),
		check('password', 'Password is required').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;
		try {
			//to see if user's exist
			let user = await User.findOne({ email });

			if (!user) {
				res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				res.status(400).json({ errors: [{ msg: 'Password is Incorrect' }] });
			}

			// return json webtoken
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get('JWT_TOKEN'),
				{
					expiresIn: 360000,
				},
				(err, token) => {
					if (err) throw err;

					res.json({ token });
				}
			);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
