const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const axios = require('axios');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route GET api/profile/me
// @description get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate('user', ['name', 'avatar']);


		if (!profile) {
			return res.status(404).json({ msg: 'There is no profile for this user' });
		}

		res.json(profile);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server error profile');
	}
});

// @route POST api/profile/
// @description Create or update user profile
// @access Private
router.post(
	'/',
	[
		auth,
		[
			check('status', 'Status is required').not().isEmpty(),
			check('skills', 'Skills is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			twitter,
			facebook,
			instagram,
			linkedin,
		} = req.body;

		//build profile object
		const profileFields = {
			user: req.user.id,
			company,
			location,
			website: website === '' ? '' : normalize(website, { forceHttps: true }),
			bio,
			skills: Array.isArray(skills)
				? skills
				: skills.split(',').map((skill) => ' ' + skill.trim()),
			status,
			githubusername,
		};
		// const profileFields = {};
		// profileFields.user = req.user.id;
		// if (company) profileFields.company = company;
		// if (website) profileFields.website = website;
		// if (location) profileFields.location = location;
		// if (bio) profileFields.bio = bio;
		// if (status) profileFields.status = status;
		// if (githubusername) profileFields.githubusername = githubusername;
		// if (skills) {
		// 	profileFields.skills = skills.split(',').map((skill) => skill.trim());
		// }

		//build social array
		profileFields.social = {};
		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.twitter = twitter;
		if (facebook) profileFields.social.facebook = facebook;
		if (linkedin) profileFields.social.linkedin = linkedin;
		if (instagram) profileFields.social.instagram = instagram;

		try {
			let profile = await Profile.findOne({ user: req.user.id });

			if (profile) {
				//update
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);

				return res.json(profile);
			}
			//create
			profile = new Profile(profileFields);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error profile');
		}
	}
);

// @route GET api/profile/
// @description Get all profiles
// @access Public
router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().sort({date:1}).populate('user', ['name', 'avatar']);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error Profile');
	}
});

// @route GET api/profile/user/:user_id
// @description Get profile by user id
// @access Public
router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id,
		}).populate('user', ['name', 'avatar']);

		if (!profile) {
			return res.status(404).json({ msg: 'Profile Not Found' });
		}
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') {
			return res.status(404).json({ msg: 'Profile Not Found' });
		}
		res.status(500).send('Server Error Profile');
	}
});

// @route DELETE api/profile/
// @description DELETE profile by user id
// @access Public
router.delete('/', auth, async (req, res) => {
	try {
		//Remove user post
		await Post.deleteMany({ user: req.user.id });
		//remove profile
		await Profile.findOneAndRemove({ user: req.user.id });
		//remove user
		await User.findOneAndRemove({ _id: req.user.id });

		res.json({ msg: 'User Deleted Successfully' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error Profile');
	}
});

// @route PUT api/profile/experience
// @description Add profile experience
// @access Private
router.put(
	'/experience',
	[
		auth,
		[
			check('title', 'Title is required').not().isEmpty(),
			check('company', 'Company is required').not().isEmpty(),
			check('from', 'From date is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { title, company, location, from, to, current, description } =
			req.body;

		const newExp = {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			profile.experience.unshift(newExp);
			await profile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route DELETE api/profile/experience/:exp_id
// @description DELETE experience from profile
// @access Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		//get remvove index
		const removeIndex = profile.experience
			.map((item) => item.id)
			.indexOf(req.params.exp_id);

		if(removeIndex<0){

			return res.status(404).json({msg:"No such exprience found"})

		}else{

			profile.experience.splice(removeIndex, 1);	
			await profile.save();
			return res.json(profile);
		}
		
		
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route PUT api/profile/education
// @description Add profile education
// @access Private
router.put(
	'/education',
	[
		auth,
		[
			check('school', 'school is required').not().isEmpty(),
			check('degree', 'Degree is required').not().isEmpty(),
			check('fieldofstudy', 'Field of study is required').not().isEmpty(),
			check('from', 'From date is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { school, degree, fieldofstudy, from, to, current, description } =
			req.body;

		const newEdu = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			profile.education.unshift(newEdu);
			await profile.save();

			return res.json(profile);
		} catch (err) {
			console.error(err.message);
			return res.status(500).send('Server Error');
		}
	}
);

// @route DELETE api/profile/education/:edu_id
// @description DELETE education from profile
// @access Private
router.delete('/education/:edu_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		//get remvove index
		const removeIndex = profile.education
			.map((item) => item.id)
			.indexOf(req.params.edu_id);
		if(removeIndex<0){
			return res.status(404).json({msg:"No such education found"})
		}else{
			profile.education.splice(removeIndex, 1);
			await profile.save();
	
			return res.json(profile);
		}
		
		
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

// // @route GET api/profile/github/:username
// // @description get user repos from github
// // @access Public
// router.get('/github/:username', (req, res) => {
// 	try {
// 		const options = {
// 			uri: encodeURI(
// 				`https://api.github.com/users/${
// 					req.params.username
// 				}/repos?per_page=5&sort=created:asc&client_id=${config.get(
// 					'githubClientId'
// 				)}&client_secret=${config.get('githubSecret')}`
// 			),
// 			method: 'GET',
// 			headers: { 'user-agent': 'node.js' },
// 		};

// 		request(options, (error, response, body) => {
// 			if (error) return console.log(error);
// 			if (response.statusCode !== 200) {
// 				return res.status(400).json({ msg: 'No Github profile found' });
// 			}

// 			res.json(JSON.parse(body));
// 		});
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Github Error');
// 	}
// });

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get('/github/:username', async (req, res) => {
	try {
		const uri = encodeURI(
			`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
		);
		
		const headers = {
			'user-agent': 'node.js',
			Authorization: `token${process.env.githubToken}`,
		};

		const githubResponse = await axios.get(uri, { headers });
		return res.json(githubResponse.data);
	} catch (err) {
		console.error(err.message);
		return res.status(404).send('No github profile found');
	}
});

module.exports = router;
