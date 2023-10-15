//Basic

const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const bodyParser = require("body-parser");

//Security Middleware import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

//Databage import

const mongoose = require("mongoose");

//Security Middleware Implement

app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(xss());

//Body Parser Implement
app.use(bodyParser.json());

//Request Rate Limit

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

//Routing Implement

app.use("/api/v1", router);

//Undefined Route Implement
app.use("*", (req, res) => {
  res.status(404).json({ status: "Failed", data: "Not Found" });
});

module.exports = app;
