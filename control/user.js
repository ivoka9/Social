const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const db = require("../model");

router.get("/all", async (req, res) => {
  const allUsers = await db.User.find({});
  res.json(allUsers);
});

router.post("/create", upload.none(), async (req, res) => {
  try {
    const newUser = {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
    };
    console.log(newUser);
    await db.User.create(newUser);
    res.json(newUser);
  } catch (err) {
    console.log(err);
    res.json("err");
  }
});

module.exports = router;
