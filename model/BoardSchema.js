const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
  board: String,
});

module.exports = mongoose.model("Board", BoardSchema);
