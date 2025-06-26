const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: [true, "Full Url is Required"],
  },
  shortUrl: {
    type: String,
    required: [true, "Short Url is Required"],
    unique: [true, "Short Url Must Be Unique "],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "User is Required"],
  },
});

module.exports = mongoose.model("urls", UrlSchema);
