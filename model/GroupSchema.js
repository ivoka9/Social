const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  board: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "board",
    },
  ],
});

module.exports = mongoose.model("Group", GroupSchema);
