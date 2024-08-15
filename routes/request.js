const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");

router.post("/", async (req, res, next) => {
  const redirectUrl = process.env.BACKEND;

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectUrl
  );

  console.log(req.session.id);

  res.header("Access-Control-Allow-Origin", process.env.FRONTEND);
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  const SCOPES = [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid",
  ];

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });

  res.json({ url: authorizeUrl });
});

module.exports = router;
