const review = require("../models/review.js"); 
const { listingSchema, reviewSchema } = require("../schema.js");
const expressError = require("../utils/expressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middileware.js");
const { checkOwner } = require("../middileware.js");
const { checkAuthor } = require("../middileware.js");
const listingControllers = require("../controllers/listings.js");

module.exports.newReviewAdd = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new review(req.body.review);
    newReview.author = req.user._id;
    await listing.review.push(newReview);

    await newReview.save();
    await listing.save();
    console.log("response saved");
    req.flash("success", "Review added successfully");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted successfully");
    res.redirect(`/listings/${id}`);
  }