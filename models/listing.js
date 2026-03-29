const mongoose = require("mongoose");
const {Schema} = mongoose;

const listSchema = new Schema({
    
    house_name: {
        type: String,
        required: false
    },
    
    image: {
        type: String,
        required: [true, "image is required"],
        default: "https://shorturl.at/3ASIb",
        set: (v) => v===""? "https://shorturl.at/3ASIb":v
    },

    description: {
        type: String,
        required: [true, "Description is required"],
        // minlength: [150, "Minimum 150 characters required"]
    },

    address: {
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
