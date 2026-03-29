const mongoose = require("mongoose");
const {Schema} = mongoose;

const listSchema = new Schema({
    
    title: {
        type: String,
        required: false
    },
    
    image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      required: [true, "image url is required"],
      default: "https://shorturl.at/3ASIb",
      set: (v) => (v === "" ? "https://shorturl.at/3ASIb" : v),
    },
  },

    description: {
        type: String,
        required: [true, "Description is required"],
        // minlength: [150, "Minimum 150 characters required"]
    },

    location: {
        type: String,
        required: [true, "address is required"],
    },

    country: {
        type: String,
        required: [true, "country is required"],
    },

    price: {
        type: Number,
        required: [true, "price is required"]
    }
});

module.exports = mongoose.model("Listing", listSchema);
