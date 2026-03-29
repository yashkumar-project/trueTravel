const mongoose = require ('mongoose');
const data = require('./data.js');
const Listing = require("../models/listing.js");

main().then(()=>{
    console.log("initilization DB connected successfully");
}).catch(err => {
    console.log(err);
});

async function main() {
    const uri = 'mongodb://127.0.0.1:27017/truetravel'; 
    await mongoose.connect(uri);
};

const initDB= async () => {
  await Listing.deleteMany();
  console.log("deleted successfully.");
  await Listing.insertMany(data.data);
  console.log("data added successfully.");
};

initDB();