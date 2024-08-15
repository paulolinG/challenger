const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const crypto = require("crypto");
const { google } = require("googleapis");
const userToken = require("../models/userToken");
const {
  createNewEvent,
  rescheduleEvent,
  removeEvent,
  findAvailableTimeSlot,
  updateEventInfo,
} = require("../services/calendarServices");
const {
  findAvailableTime,
  listEventsInTimeInterval,
} = require("../services/calendarHelper");

// async function listEvents(auth) {
//   const calendar = google.calendar({ version: "v3", auth });
//   const res = await calendar.events.list({
//     calendarId: "primary",
//     timeMin: new Date().toISOString(),
//     maxResults: 10,
//     singleEvents: true,
//     orderBy: "startTime",
//   });
//   const events = res.data.items;
//   if (!events || events.length === 0) {
//     console.log("No upcoming events found.");
//     return;
//   }
//   console.log("Upcoming 10 events:");
//   events.map((event, i) => {
//     const start = event.start.dateTime || event.start.date;
//     console.log(`${start} - ${event.summary}`);
//   });
//   const startDate = new Date("2024-07-21T17:00:00Z");
//   const endDate = new Date("2024-07-21T18:00:00Z");
//   const id = await createNewEvent(auth, "primary", startDate, endDate, "");
//   await updateEventInfo(auth, "primary", id, "event", "paris", "olympics");
// }

function generateSessionId() {
  return crypto.randomBytes(16).toString("hex");
}

router.get("/", async (req, res, next) => {
  const code = req.query.code;
  if (!code) {
    return res
      .status(400)
      .json({ success: false, error: "Authorization code is missing" });
  }
  try {
    const redirectUrl = process.env.BACKEND;
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );

    // exchange authorization code for access and refresh tokens
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    console.log(req.session.id);

    req.session.tokens = tokens;

    res.redirect(process.env.FRONTEND);
  } catch (err) {
    console.error("Authentication error:", err);
    res
      .status(500)
      .json({ success: false, error: "Authentication failed: " + err.message });
  }
});

module.exports = router;
