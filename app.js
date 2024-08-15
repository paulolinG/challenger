const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const connectToDB = require("./Connect/connect");
const cors = require("cors");
require("dotenv").config();

const oauthRouter = require("./routes/oauth");
const requestRouter = require("./routes/request");
const htmlAuthRouter = require("./routes/htmlAuth");
const htmlFileRouter = require("./routes/htmlResponse");
const checkAuthRouter = require("./routes/checkAuth");
const { auth } = require("google-auth-library");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND, // Replace with your frontend's URL
    credentials: true, // Allow cookies to be sent
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.json()); // Add this line to parse JSON bodies

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Move route definitions here, before error handling middleware
app.use((req, res, next) => {
  console.log("Request path:", req.path);
  console.log("Session ID:", req.session.id);
  console.log("Session data:", req.session);
  console.log("Cookies:", req.cookies);
  next();
});
app.use("/oauth", oauthRouter);
app.use("/request", requestRouter);
app.use("/htmlAuth", htmlAuthRouter);
app.use("/htmlResponse", htmlFileRouter);
app.use("/checkAuth", checkAuthRouter);

// 404 handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message }); // Send JSON instead of rendering a view
});

app.listen(3000, () => {
  console.log(`Challenger listening on port 3000`);
  connectToDB();
});
