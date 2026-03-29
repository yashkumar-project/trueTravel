const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");

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
        

app.get('/', (req, res) => {
    res.send("hello world");
});

app.get('/test', async (req,res)=> {
    let testValue = new Listing ({
  house_name: "Forest Cabin Retreat",
  image: "",
  description: "A peaceful cabin located deep inside the forest, surrounded by greenery and fresh air. Perfect for people looking to disconnect from busy city life and enjoy nature, silence, and a calming environment with basic modern amenities available.",
  address: "Near Jim Corbett National Park",
  country: "India",
  price: 3500
});

  await testValue.save();
   console.log(testValue);
   res.send ( " data added successfully");
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});