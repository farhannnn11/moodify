require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/auth.route");
const cors = require("cors");
const path = require("path")
const app = express();
const cookie = require("cookie-parser");

const songRouter = require("./routes/song.routes");
app.use(cookie());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.static("./public"));
app.use("/api/auth", authRouter);
app.use("/api/songs", songRouter);
module.exports = app;
