const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const userToken = require("../models/userToken");
const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis");
require("dotenv").config();

router.post("/", async (req, res, next) => {
  const redirectUrl = process.env.BACKEND;
  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectUrl
  );
  console.log(req.session.tokens);
  if (req.session.tokens) {
    oAuth2Client.setCredentials(req.session.tokens);
    if (oAuth2Client.isTokenExpiring()) {
      console.log("renew session");
      return res.json({ sessionExpired: true, promptRenew: true });
    }
    console.log("session valid");
    return next();
  }

  console.log("No valid session");
  return res.json({ sessionExpired: true, promptRenew: false });
});

module.exports = router;
