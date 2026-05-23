const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middileware.js");
const { checkOwner } = require("../middileware.js");
const { checkAuthor } = require("../middileware.js");
const schema = require("../schema.js");
const reviewControllers = require("../controllers/review.js");

//vlaidation code middleware
const validatereview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// post route to store new review
router.post(
  "/",
  isLoggedIn,
  validatereview,
  wrapAsync(reviewControllers.newReviewAdd),
);

//delete review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  checkAuthor,
  wrapAsync(reviewControllers.deleteReview),
);

module.exports = router;
