// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const app = express();

const cors = require("cors");

const PORT = process.env.PORT;

app.use(cors());

const sessions = require("express-session");

require("dotenv").config();

const db = require("./model");
const constrol = require("./control");

app.use(
  sessions({
    secret: process.env.SESSION_SICRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use("/group", constrol.group);

app.use("/", constrol.user);

app.listen(process.env.PORT, () => {
  console.log("listening on :" + process.env.PORT);
});
// =======================================
//      MONGOOSE CONNECTION LOGIC
// =======================================
app.get("/", (req, res) => {
  res.render("index.ejs");
});
