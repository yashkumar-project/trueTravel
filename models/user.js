const { required } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        typeof: String,
        required:true
    },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);