const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
const listing = require('./models/listing.js');
const path = require ( "path"); 

app.use(express.json());

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

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});