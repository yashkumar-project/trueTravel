const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const expressError = require("../utils/expressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middileware.js");
const { checkOwner } = require("../middileware.js");
const { checkAuthor } = require("../middileware.js");
const listingControllers = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//validation code middleware
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

router
  .route("/")
  .get(wrapAsync(listingControllers.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    wrapAsync(listingControllers.newListing),
  );

// router to create new Listing
router.get("/new", isLoggedIn, listingControllers.newListingForm);

router
  .route("/:id")
  .get(wrapAsync(listingControllers.showListing))
  .put(isLoggedIn,
     checkOwner,
     upload.single("listing[image]"),
     validateListing,
     wrapAsync(listingControllers.updateListing))
  .delete(isLoggedIn, checkOwner, wrapAsync(listingControllers.deleteListing));

// router to edit the listing
router.get(
  "/:id/edit",
  isLoggedIn,
  checkOwner,
  wrapAsync(listingControllers.editListing),
);

module.exports = router;
