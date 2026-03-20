const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  title: String,
  status: { type: String, default: "pending_user_approval" }
});

module.exports = mongoose.model("Song", SongSchema);