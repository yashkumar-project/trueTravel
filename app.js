const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
const path = require ( "path");
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate')

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);

app.set ( "viewengine", "ejs");
app.set("views", path.join(__dirname, "views"));

main().then(()=>{
    console.log("connected successfully");
}).catch(err => {
    console.log(err);
});

async function main() {
    const uri = 'mongodb://127.0.0.1:27017/truetravel'; 
    await mongoose.connect(uri);
}

app.get('/', (req, res) => {
    res.send("hello world");
});

// index route for showing all listing.
app.get('/listings',async (req,res) => {
   const Listings = await Listing.find({});
   res.render("./listings/Listings.ejs", {Listings});
});

// route to create new listings
app.get('/listings/new', (req, res) => {
    res.render("./listings/new.ejs");
});

//show route to show data when clicked
app.get('/listings/:id', async (req, res) => {
    let {id} = req.params;
    // console.log(id);
    const destination = await Listing.findById(id);
    res.render("./listings/show.ejs", {destination});    
});

app.get('/listings/:id/edit', async (req, res) => {
    let {id} = req.params;
    const destination = await Listing.findById(id);
    res.render("./listings/edit.ejs", {destination});
});

app.post('/listings', async (req,res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings?alert=newListingAdded');
});

app.put('/listings/:id', async (req,res) => {
    let { id } = req.params;
    const updatedListing= req.body.listing;
    console.log(updatedListing);
    await Listing.findByIdAndUpdate(id, updatedListing);
    res.redirect(`/listings/${id}`);
});

app.delete('/listings/:id', async (req,res) => {
    let {id} = req.params;
    console.log(id);
    
    await Listing.findByIdAndDelete(id);
    console.log(`Deleted successfully with the ${id}`);
    res.redirect("/listings");
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});