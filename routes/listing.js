const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const {listingSchema, reviewSchema} = require('../schema.js');
const expressError = require('../utils/expressError.js');
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


// index router for showing all listing.
router.get('/',wrapAsync( async (req,res) => {
   const Listings = await Listing.find({});
   if (!Listings){
    req.flash("error", " looking for post does not exist");
    return res.redirect("/listings");
   }
   res.render("./listings/listings.ejs", {Listings}); 
}));

// router to create new listings
router.get('/new', (req, res) => {
    res.render("./listings/new.ejs");
});

//show router to show data when clicked
router.get('/:id', wrapAsync( async (req, res) => {
    let {id} = req.params;
    // console.log(id);
    const destination = await Listing.findById(id).populate("review");
    if (!destination){
    req.flash("error", " looking for post does not exist");
    return res.redirect("/listings");
   }
    res.render("./listings/show.ejs", {destination});    
}));

// router to edit the listing
router.get('/:id/edit',wrapAsync( async (req, res) => {
    let {id} = req.params;
    const destination = await Listing.findById(id);
    res.render("./listings/edit.ejs", {destination});
}
));

// router to create new listing
router.post('/',
    wrapAsync( async (req,res,next) => {
    let result = listingSchema.validate(req.body);
    console.log(result);
    if ( result.error) {
        new expressError(result.error, 400 );
    }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New listing created successfully!");
    res.redirect('/listings');
  })
);

// router to update the listing
router.put('/:id', wrapAsync( async (req,res) => {
    let { id } = req.params;
    const updatedListing= req.body.listing;
    console.log(updatedListing);
    await Listing.findByIdAndUpdate(id, updatedListing);
    res.redirect(`/listings/${id}`);
}
));

// router to delete the listing
router.delete('/:id', wrapAsync( async (req,res) => {
    let {id} = req.params;
    console.log(id);
    
    await Listing.findByIdAndDelete(id);
    console.log(`Deleted successfully with the ${id}`);
    res.redirect("/listings");
}
));

module.exports = router;