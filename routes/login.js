const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middileware.js");
const userAuth = require("../controllers/user.js");

router.get("/login", (req, res) => {
  res.render("../views/users/login.ejs");
});

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  wrapAsync(userAuth.loginSuccess),
);

module.exports = router;
