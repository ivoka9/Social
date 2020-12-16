const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { required: true, unique: true, type: String },
  password: { required: true, type: String },
  highscore: { type: Number },
  name: String,
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
