const mongoose = require("mongoose");

const userTokenSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  tokens: {
    access_token: String,
    refresh_token: String,
    scope: String,
    token_type: String,
    expiry_date: Number,
  },
});

module.exports = mongoose.model("Users", userTokenSchema);
