const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require('../utils/wrapAsync');

router.get('/signup', (req, res) => {
    res.render('../views/users/signup.ejs');
});

router.post('/signup', wrapAsync(async (req,res) => {
   try {
     let {username, email, password} = req.body;
    const newUser = new User({email, username});
    const registeredUser = await User.register(newUser, password);
    req.flash("success", "Welcome to True Travel!");
    res.redirect('/listings');
   } catch (error) {
    req.flash("error", error.message);
    res.redirect('/signup');
   }
}));

module.exports = router;