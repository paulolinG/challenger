const { eventNames } = require("../models/userToken");
const {
  listEventsInTimeInterval,
  filterOutAllDayEvents,
  isTimeMidnight,
  findAvailableTime,
  checkForConflict,
} = require("./calendarHelper");
const { google } = require("googleapis");

// creates a new event
async function createNewEvent(auth, calendarId, start, end, recurrenceRule) {
  // if we are not creating an All-Day event, check for time conflicts
  if (!isTimeMidnight(start) || !isTimeMidnight(end)) {
    const timeConflicts = await listEventsInTimeInterval(
      auth,
      start,
      end,
      calendarId
    );
    // If there are any time conflicts, we cannot schedule an event
    if (timeConflicts.length > 0) {
      throw new Error("time conflict");
    }
  }
  const calendar = google.calendar({ version: "v3", auth });
  const response = await calendar.calendars.get({ calendarId });
  const event = {
    start: {
      dateTime: start.toISOString(),
      timeZone: response.data.timeZone,
    },
    end: {
      dateTime: end.toISOString(),
      timeZone: response.data.timeZone,
    },
    recurrence: recurrenceRule ? [recurrenceRule] : undefined,
  };
  try {
    const res = await calendar.events.insert({
      calendarId: calendarId,
      resource: event,
    });

    return res.data.id;
  } catch (error) {
    throw error;
  }
}

// reschedules an event if possible
async function rescheduleEvent(
  auth,
  calendarId,
  eventId,
  newStartTime,
  newEndTime
) {
  const calendar = google.calendar({ version: "v3", auth });
  // check for time conflicts to see if we can reschedule event
  if (!isTimeMidnight(newStartTime) || !isTimeMidnight(newEndTime)) {
    const timeConflicts = await listEventsInTimeInterval(
      auth,
      newStartTime,
      newEndTime,
      calendarId
    );
    // If there are any time conflicts, we cannot schedule an event
    if (timeConflicts.length > 0) {
      throw new Error("time conflict");
    }
  }
  // reschedule the event
  try {
    const getResponse = await calendar.events.get({
      calendarId: calendarId,
      eventId: eventId,
    });

    const event = getResponse.data;

    event.start = {
      dateTime: newStartTime.toISOString(),
      timeZone: event.start.timeZone,
    };
    event.end = {
      dateTime: newEndTime.toISOString(),
      timeZone: event.end.timeZone,
    };

    await calendar.events.update({
      calendarId: calendarId,
      eventId: eventId,
      resource: event,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log("Event not found. It may have already been deleted.");
      // Handle the case where the event doesn't exist
    } else {
      console.error("Error deleting event:", error);
      // Handle other types of errors
    }
    throw error;
  }
}

// removes an event if event exists
async function removeEvent(auth, calendarId, eventId) {
  const calendar = google.calendar({ version: "v3", auth });
  try {
    await calendar.events.delete({
      calendarId: calendarId,
      eventId: eventId,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log("Event not found. It may have already been deleted.");
      // Handle the case where the event doesn't exist
    } else {
      console.error("Error deleting event:", error);
      // Handle other types of errors
    }
    throw error;
  }
}

// returns all recurring events in calendar with calendarId
async function listRecurringEvents(auth, calendarId) {
  const calendar = google.calendar({ version: "v3", auth });
  try {
    const response = await calendar.events.list({
      calendarId: calendarId,
      singleEvents: false,
      orderBy: "startTime",
    });
    const events = reponse.data.items;
    const recurringEvents = events.filter((event) => event.recurrence);
    return recurringEvents;
  } catch (error) {
    throw error;
  }
}

// finds an available time slot between startTime and endTime
async function findAvailableTimeSlot(
  auth,
  calendarId,
  eventDuration,
  startTime,
  endTime,
  increment
) {
  const calendar = google.calendar({ version: "v3", auth });
  try {
    let checkStart = startTime;
    let checkEnd = new Date(startTime.getTime() + eventDuration);
    while (checkEnd <= endTime) {
      if (await checkForConflict(auth, calendarId, checkStart, checkEnd)) {
        const availableTimeFrame = [checkStart, checkEnd];
        return availableTimeFrame;
      }
      console.log("conflict");
      checkStart = new Date(checkStart.getTime() + increment);
      checkEnd = new Date(checkEnd.getTime() + increment);
    }
    return null;
  } catch (error) {
    throw error;
  }
}

// tags an event as inflexible
async function setInflexibleStatus(auth, calendarId, eventId, status) {
  const calendar = google.calendar({ version: "v3", auth });
  try {
    const event = await calendar.events.get({
      calendarId: calendarId,
      eventId: eventId,
    });
    if (!event.data.extendedProperties) {
      event.data.extendedProperties = { shared: {} };
    } else if (!event.data.extendedProperties.shared) {
      event.data.extendedProperties.shared = {};
    }
    event.data.extendedProperties.shared.inflexible = status;
    await calendar.events.update({
      calendarId: calendarId,
      eventId: eventId,
      resource: event.data,
    });
  } catch (error) {
    throw error;
  }
}

// updates information about an event
async function updateEventInfo(
  auth,
  calendarId,
  eventId,
  summary,
  location,
  description,
  attendees,
  reminders
) {
  const calendar = google.calendar({ version: "v3", auth });
  try {
    const event = await calendar.events.get({
      calendarId: calendarId,
      eventId: eventId,
    });
    event.data.summary = summary;
    event.data.location = location;
    event.data.description = description;
    event.data.attendees = attendees;
    event.data.reminders = reminders;
    await calendar.events.update({
      calendarId: calendarId,
      eventId: eventId,
      resource: event.data,
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createNewEvent: createNewEvent,
  rescheduleEvent: rescheduleEvent,
  removeEvent: removeEvent,
  findAvailableTimeSlot: findAvailableTimeSlot,
  updateEventInfo: updateEventInfo,
  setInflexibleStatus: setInflexibleStatus,
};
