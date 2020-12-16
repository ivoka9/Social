const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const db = require("../model");

router.get("/all", async (req, res) => {
  console.log("groups");
  const allGroups = await db.Group.find({});
  res.status(200).json(allGroups);
});

router.post("/create/:username", upload.none(), async (req, res) => {
  console.log("here");
  const group = await db.Group.findOne({ name: req.body.name });
  const user = await db.User.findOne({ username: req.params.username });
  console.log(group, user);
  if (user === null) {
    res.status(403).json("Please Log In");
  }
  if (group != null) {
    res.status(403).json("Group Name Taken");
  } else {
    const group = await db.Group.create({
      name: req.body.name,
      lead: user._id,
    });
    if (user.groups === undefined) {
      user.groups = [group];
    } else {
      user.groups.push(group);
    }
    console.log(user);
    await user.save();
    res.status(200).json(group);
  }
});

module.exports = router;
