const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,           
        },

        phonenumber: {
            type: Number,
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            trim: true,
        }

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);