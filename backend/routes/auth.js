const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'ParthiSb@dbo$y';

// ROUTE 1 : Create a User using: POST "/api/auth/createUser". No login required
router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    // if there are error return bad request and the errors.
    const errors = validationResult(req);
    let success=true;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
         success=false;
    }

    try {
        // check wheather user with this email exists already
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ error: "Sorry a User with this email is already exist" });
         success=false;

        }
        //create a new USer
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })

        data = {
            user: {
                id: user.id
            }
        }


        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(authToken);

        // res.json(user);
        res.json({ success,authToken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})


// ROUTE 2 : Authenticate A USER using : POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').exists(),
], async (req, res) => {
    // if there are error return bad request and the errors.
    const errors = validationResult(req);
    let success=true;
    if (!errors.isEmpty()) {
        success=false;
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        let success=true;
        if (!user) {
            success=false;
            return res.status(400).json({ success,error: "Please try to login with correct credientials" });
        }

        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            success=false;
            return res.status(400).json({ success,error: "Please try to login with correct credientials" });
        }

        data = {
            user: {
                id: user.id
            }
        }


        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ success,authToken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }
})


// ROUTE 3 : Get Loggedin user details using : POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }


})


module.exports = router