const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
const path = require ( "path");
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync.js');
const expressError = require('./utils/expressError.js');
const {listingSchema, reviewSchema} = require('./schema.js');
const review = require("./models/review.js");

const listingRoutes = require('./routes/listing.js');
const reviewRoutes = require('./routes/reviews.js');

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

app.use('/listings', listingRoutes);
app.use('/listings/:id/reviews', reviewRoutes);

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

// to show error if no page available, 404
app.use((req, res, next) => {
  next(new expressError("Page Not Found", 404 ));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("./listings/error.ejs", { message, statusCode });
});

// starting server code
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});