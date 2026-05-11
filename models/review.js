const mongoose = require("mongoose");
const {Schema} = mongoose;

const reviewSchema = new Schema ({
    comment: String,
    rate: {
        typeof: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        typeof: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Review", reviewSchema);