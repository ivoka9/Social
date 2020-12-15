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

router.post("/create", upload.none(), async (req, res) => {
  const group = db.Group.findOne({ name: req.body.name });
  if (!req.session && !req.session._id != null) {
    res.status(403).json("Please Log In");
  }
  if (group === {} || group === null) {
    res.status(403).json("Group Name Taken");
  } else {
  }
});

module.exports = router;
