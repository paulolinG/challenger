const { google } = require("googleapis");
const { events } = require("../models/userToken");

async function checkForConflict(auth, calendarId, startTime, endTime) {
  const calendar = google.calendar({ version: "v3", auth });
  const events = await listEventsInTimeInterval(
    auth,
    startTime,
    endTime,
    calendarId
  );
  return events.length === 0;
}

// lists all events in calendar between startTime and endTime
async function listEventsInTimeInterval(auth, startTime, endTime, calendarId) {
  const calendar = google.calendar({ version: "v3", auth });
  try {
    const allEventsInInterval = await calendar.events.list({
      calendarId: calendarId,
      timeMin: startTime.toISOString(),
      timeMax: endTime.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = allEventsInInterval.data.items;
    return events;
  } catch (error) {
    throw error;
  }
}

// given a list of events, returns a list of events that are not all-day
function filterOutAllDayEvents(events) {
  const nonAllDayEvents = events.filter((event) => {
    return event.start.dateTime && event.end.dateTime;
  });
  return nonAllDayEvents;
}

function isTimeMidnight(date) {
  return (
    date.getHours() === 0 &&
    date.getMinutes() === 0 &&
    date.getSeconds() === 0 &&
    date.getMilliseconds() === 0
  );
}

// given an event, return the duration of the event in minutes
function getEventDuration(event) {
  const start = new Date(event.start.dateTime || event.start.date);
  const end = new Date(event.end.dateTime || event.end.date);

  const durationMs = end.getTime() - start.getTime();

  return durationMs;
}

// returns the amount of free time between startTime and endTime in minutes
async function findAvailableTime(auth, calendarId, startTime, endTime) {
  const calendar = google.calendar({ version: "v3", auth });
  if (endTime <= startTime) {
    throw new Error("invalid time interval: startTime is later than endTime");
  }
  try {
    const eventsInInterval = await listEventsInTimeInterval(
      auth,
      startTime,
      endTime,
      calendarId
    );
    let totalTimeOccupied = 0;
    eventsInInterval.forEach((event) => {
      totalTimeOccupied += getEventDuration(event);
    });
    const totalTimeMs = endTime.getTime() - startTime.getTime();
    const totalTimeMinutes = Math.round(totalTimeMs / 60000);
    return totalTimeMinutes - totalTimeOccupied;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listEventsInTimeInterval: listEventsInTimeInterval,
  filterOutAllDayEvents: filterOutAllDayEvents,
  isTimeMidnight: isTimeMidnight,
  findAvailableTime: findAvailableTime,
  checkForConflict: checkForConflict,
};
