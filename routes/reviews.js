const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync.js');
const expressError = require('../utils/expressError.js');
const {listingSchema, reviewSchema} = require('../schema.js');
const review = require("../models/review.js");
const Listing = require("../models/listing.js");

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
router.post( '/',
    validatereview,
    wrapAsync(async (req,res) => {
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new review (req.body.review);
    await listing.review.push(newReview);

    await newReview.save();
    await listing.save();
    console.log("response saved");
    res.redirect(`/listings/${listing._id}`);
}));

//delete review route
router.delete('/:reviewId', wrapAsync( async(req,res)=> {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {review: reviewId}});
    await review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}));

module.exports = router;