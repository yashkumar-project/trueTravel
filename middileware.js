const Listing = require("./models/listing.js");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be signed in to create a new listing!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.checkOwner = async (req, res, next) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currentUser._id)) {
    req.flash("error", "You don't have permission to do that!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.checkAuthor = async (req, res, next) => {
  let { reviewId, id } = req.params;

  const foundReview = await Review.findById(reviewId);

  if (!foundReview.author.equals(res.locals.currentUser._id)) {
    req.flash("error", "You don't have permission to do that!");
    return res.redirect(`/listings/${id}`);
  }

  next();
};
