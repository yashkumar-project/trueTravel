const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require('../utils/wrapAsync');
const {isLoggedIn} = require('../middileware.js');
const { saveRedirectUrl } = require('../middileware.js');

router.get('/signup', (req, res) => {
    res.render('../views/users/signup.ejs');
});

router.post('/signup', wrapAsync(async (req,res) => {
   try {
     let {username, email, password} = req.body;
    const newUser = new User({email, username});
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
        if(err){
            next(err);
        }
        req.flash("success", "Welcome to True Travel!");
        res.redirect('/listings');
    });
   } catch (error) {
    req.flash("error", error.message);
    res.redirect('/signup');
   }
}));

router.get('/logout',
    // isLoggedIn,
    (req,res,next) => {
    req.logout((err) => {
        if(err){
           return next(err);
        }
        req.flash("success", "you are successfully logout.");
    res.redirect('/listings');
    });
});

module.exports = router;