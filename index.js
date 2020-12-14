// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const db = require("./model");
const constrol = require("./control");

const PORT = process.env.PORT;
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
