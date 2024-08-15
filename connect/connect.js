const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");
  } catch (err) {
    console.error("DB connection error", err);
  }
};

module.exports = connectToDB;
