// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const app = express();
const cors = require("cors");
const sessions = require("express-session");

require("dotenv").config();

const db = require("./model");
const constrol = require("./control");

const PORT = process.env.PORT;

app.use(
  sessions({
    secret: process.env.SESSION_SICRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(cors());
app.use(express.json());
app.use("/", constrol.user);

// =======================================
//      MONGOOSE CONNECTION LOGIC
// =======================================

// =======================================
//              LISTENER
// =======================================
app.listen(PORT, () => {
  console.log(`listening on PORT: ${PORT}`);
});
