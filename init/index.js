const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
  .then(() => {
    console.log("initilization DB connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  const uri = "mongodb://127.0.0.1:27017/truetravel";
  await mongoose.connect(uri);
}

const initDB = async () => {
  await Listing.deleteMany();
  console.log("deleted successfully.");
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6a107d9d6e53780daffa2fed",
  }));
  await Listing.insertMany(initData.data);
  console.log("data added successfully.");
};

initDB();
