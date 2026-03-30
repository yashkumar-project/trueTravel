const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
// const listing = require('./models/listing.js');
const path = require ( "path"); 

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

main().then(()=>{
    console.log("connected successfully");
}).catch(err => {
    console.log(err);
});

async function main() {
    const uri = 'mongodb://127.0.0.1:27017/truetravel'; 
    await mongoose.connect(uri);
}
        
app.set ( "viewengine", "ejs");
app.set("views", path.join(__dirname, "views"));

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

app.post('/listings', async (req,res) => {
    const newListing = new Listing(req.body);
    await newListing.save();
    res.redirect('/listings?alert=newListingAdded');
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});