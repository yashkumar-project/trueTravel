const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middileware.js");
const { saveRedirectUrl } = require("../middileware.js");
const userAuth = require("../controllers/user.js");

router.get("/signup", (req, res) => {
  res.render("../views/users/signup.ejs");
});

router.post("/signup", wrapAsync(userAuth.signUpNewUser));

router.get("/logout", isLoggedIn, userAuth.logOutUser);

module.exports = router;
