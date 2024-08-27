const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const normalize = require("normalize-url");

const User = require("../../models/User");

// @route POST api/users
// @description register
// @access Public
router.post(
    "/",
    [
        //express-validator
        check("name", "Name is required").not().isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check(
            "password",
            "Enter a password of minimum of six characters"
        ).isLength({ min: 6 }),
    ],

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        try {
            //to see if user's exist
            let user = await User.findOne({ email });

            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User already exists" }] });
            }

            // get user gravatar
            const avatar = normalize(
                gravatar.url(email, {
                    s: "200",
                    r: "pg",
                    d: "mm",
                }),
                { forceHttps: true }
            );
            // const avatar = gravatar.url(req.body.email,
            //     { s: '100', r: 'x', d: 'mm' },
            //     true)

            user = new User({
                name,
                email,
                avatar,
                password,
            });

            //encrypt password
            const salt = await bcrypt.genSalt(10);
            console.log(salt);
            user.password = await bcrypt.hash(password, salt);
            // console.log(user);

            await user.save();

            // return json webtoken
            const payload = {
                user: {
                    id: user.id,
                },
            };

            const options = {
                expiresIn: 360000,
            };

            try {
                // Sign the token and send it in the response
                const token = await jwt.sign(
                    payload,
                    process.env.JWT_TOKEN,
                    options
                );
                res.status(201).json({ token });
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Server Error");
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;
