const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'ParthiSb@dbo$y';

// Create a User using: POST "/api/auth/createUser". No login required
router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    // if there are error return bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
 
    try {
        // check wheather user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a User with this email is already exist" });
        }
        //create a new USer
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        
        data={
            user:{
                id:user.id
            }
        }


        const authToken = jwt.sign(data,JWT_SECRET);
        // console.log(authToken);

        // res.json(user);
        res.json({authToken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }

})

module.exports = router