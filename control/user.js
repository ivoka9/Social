const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const db = require("../model");

router.get("/all", async (req, res) => {
  const allUsers = await db.User.find({});
  res.status(200).json(allUsers);
});

router.post("/logout", async (req, res) => {
  await req.session.destroy(function (err) {});
  res.status(200).json("logout succefull");
  res.end();
});

router.get("/highscore", async (req, res) => {
  const users = await db.User.find({});
  let scores = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].highscore)
      scores.push({ name: users[i].name, score: users[i].highscore });
  }
  scores.sort((a, b) => b.score - a.score);
  scores.length = 6;
  res.status(200).json(scores);
});

router.post("/highscore/:user", upload.none(), async (req, res) => {
  try {
    const user = await db.User.findOne({ username: req.params.user });
    const highscore = Number(req.body.score);
    console.log(user, highscore);
    if (user.highscore < highscore) {
      user.highscore = req.body.score;
      user.save();
      res.status(200).json(user);
    } else {
      res.status(200).json("cant beat your highscore");
    }
  } catch (err) {
    console.log(err);
    res.send("err");
  }
});

router.post("/login", upload.none(), async (req, res) => {
  try {
    const user = await db.User.findOne({ username: req.body.username });
    if (user != null && user.password === req.body.password) {
      res.status(200).json(user);
      res.end();
    } else {
      res.status(403).json("Forbidden");
      res.end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("err");
  }
});

router.get("/user", (req, res) => {
  const user = {
    id: req.session._id,
    username: req.session.username,
    name: req.session.name,
  };
  res.json(user);
});

router.post("/create", upload.none(), async (req, res) => {
  try {
    const newUser = {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      highscore: 0,
    };
    const user = await db.User.findOne({ username: req.body.username });
    if (user != null) {
      res.status(403).json(user);
      res.end();
    } else {
      await db.User.create(newUser);
      res.status(200).json(newUser);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/finduser/:id", async (req, res) => {
  const user = await db.User.findOne({ username: req.params.id });
  if (user === null || user === {}) {
    res.status(200).json("User not found");
    res.end();
  } else {
    res.status(200).json(user);
  }
});

router.post("/addfriend/:id", upload.none(), async (req, res) => {
  try {
    const user = await db.User.findOne({ username: req.body.username });
    if (user === null) req.status(404).json("User not Found");
    const friend = await db.User.findOne({ username: req.params.id });
    console.log(friend);
    if (friend === null) req.status(404).json("Friend not Found");
    console.log(user);
    if (user.friends.indexOf(friend._id) === -1) {
      user.friends.push(friend._id);
    }

    await user.save();
    res.status(200).json("Friend added");
  } catch (err) {
    console.log(err);
    res.status(500).json("err");
  }
});

module.exports = router;
