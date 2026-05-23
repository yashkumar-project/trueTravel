const Listing = require("../models/listing.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const expressError = require("../utils/expressError.js");
const { checkAuthor } = require("../middileware.js");

module.exports.index = async (req, res) => {
  const Listings = await Listing.find({});
  if (!Listings) {
    req.flash("error", " looking for post does not exist");
    return res.redirect("/listings");
  }
  res.render("./listings/listings.ejs", { Listings });
};

module.exports.newListingForm = (req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const destination = await Listing.findById(id)
    .populate({ path: "review", populate: { path: "author" } })
    .populate("owner");
  // console.log(destination);
  if (!destination) {
    req.flash("error", " looking for post does not exist");
    return res.redirect("/listings");
  }
  res.render("./listings/show.ejs", { destination });
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  const destination = await Listing.findById(id);

  let originalUrl = destination.image.url;
  originalUrl =originalUrl.replace("/upload", "/upload/w_250");
  res.render("./listings/edit.ejs", { destination, originalUrl });
};

module.exports.newListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  let result = listingSchema.validate(req.body);
  if (result.error) {
    new expressError(result.error, 400);
  }
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { filename, url };
  await newListing.save();
  req.flash("success", "New listing created successfully!");
  res.redirect("/listings");
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  const updatedListing = req.body.listing;
  let listing = await Listing.findById(id);
  await Listing.findByIdAndUpdate(id, updatedListing);

  if(typeof req.file !== "undefined"){
  let url = req.file.path;
  let filename = req.file.filename;
  listing.image = { filename, url };
  await listing.save();
  }

  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  // console.log(id);
  -(await Listing.findByIdAndDelete(id));
  console.log(`Deleted successfully with the ${id}`);
  res.redirect("/listings");
};
