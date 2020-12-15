// =======================================
//              DEPENDENCIES
// =======================================
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http, {
  cors: true,
});
const cors = require("cors");

app.use(cors());

const sessions = require("express-session");

http.listen(process.env.PORT, () => {
  console.log("listening on *:3000");
});

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
app.use("/group", constrol.group);

app.use("/", constrol.user);

// =======================================
//      MONGOOSE CONNECTION LOGIC
// =======================================
app.get("/", (req, res) => {
  res.render("index.ejs");
});
// =======================================
//              LISTENER
// =======================================
io.on("connection", (socket) => {
  socket.on("join", (name) => {
    console.log(name.name);
  });
  socket.emit("add");
});
