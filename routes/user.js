const express = require('express');
const bcrypt = require("bcryptjs")

const router = express.Router();
const jwt = require('jsonwebtoken')

// const BlogPost = require('../models/blogPost');
const User = require("../models/user")

//error handler 
const errorHandler = require('../utils/errorHandler')

// SignUp user
router.post('/sign-up', async (req, res, next) => {

    const {username, email, password} = req.body

    if(!username || !email || !password){
        // return res.status(400).json({message: "Fields cannot be empty"})
        next(errorHandler(400, "Fields cannot be empty"))
    }

    let hashedPassword = bcrypt.hashSync(password, 10)

    let newUser = new User({
        username,
        email,
        password: hashedPassword
    })

    try {
        await newUser.save()
        res.status(200).json("Signup successful")
    } catch (error) {
        next(errorHandler)
    }
});

//LOGIN USER
router.post('/login', async (req, res, next) => {
    const {email, password} = req.body

    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    }

    try {
        const validUser = await User.findOne({ email })
        if(!validUser){
            return next(errorHandler(404, "User not found"))
        }

        const validPassword = bcrypt.compareSync(password, validUser.password)
        if(!validPassword){
            return next(errorHandler(400, "Invalid Password"))
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)

        //removing password from res and storing it in rest
        const { password: pass, ...rest } = validUser._doc;

        res
        .status(200)
        .cookie('access_token', token, {
            httpOnly: true,
        })
        .json(rest);

    } catch (error) {
        return next(errorHandler(error))
    }
})



router.get('/name', (req, res) => {
    const data =  {
        username: 'peterson',
        age: 5
    };
    res.json(data);
});



module.exports = router;