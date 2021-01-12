const express = require("express");
const app = express();
require("express-async-errors");

const mongoose = require("mongoose");

const cors = require("cors");
const router = require("./controllers/routes");
const middleware = require("./utils/middleware");

const config = require("./utils/config");
const logger = require("./utils/logger");

const url = config.MONGODB_URI;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error.message);
  });


app.use(express.json());
app.use(cors());
app.use("/api/posts", router);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;