const mongoose = require("mongoose");
const { listingSchema } = require("../schema");
const {Schema} = mongoose;
const review = require("./review.js");

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
    },

    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "review",
        },
    ],
});

listSchema.post("findOneAndDelete", async (listing) => {
    if (listing){
        await review.deleteMany({_id: { $in: listing.review}});
    }
})

module.exports = mongoose.model("Listing", listSchema);
