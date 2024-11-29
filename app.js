var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var dotenv = require("dotenv");
dotenv.config();
const sequelize = require("./config/db.js");

var app = express();

//sequelize.sync();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
